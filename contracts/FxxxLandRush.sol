pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// Fxxx Land Rush Contract
//
// Deployed to : {TBA}
//
// Note: Calculations are based on GZE having 18 decimal places
//
// Enjoy.
//
// (c) BokkyPooBah / Bok Consulting Pty Ltd for GazeCoin 2018. The MIT Licence.
// ----------------------------------------------------------------------------

import "BTTSTokenInterface110.sol";
import "Owned.sol";
import "PriceFeedInterface.sol";


// ----------------------------------------------------------------------------
// Safe maths
// ----------------------------------------------------------------------------
library SafeMath {
    function add(uint a, uint b) internal pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }
    function sub(uint a, uint b) internal pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }
    function mul(uint a, uint b) internal pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }
    function div(uint a, uint b) internal pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
    function max(uint a, uint b) internal pure returns (uint c) {
        c = a >= b ? a : b;
    }
    function min(uint a, uint b) internal pure returns (uint c) {
        c = a <= b ? a : b;
    }
}


// ----------------------------------------------------------------------------
// FxxxLandRush Contract
// ----------------------------------------------------------------------------
contract FxxxLandRush is Owned, ApproveAndCallFallBack {
    using SafeMath for uint;

    BTTSTokenInterface public bttsToken;
    BTTSTokenInterface public gzeToken;
    PriceFeedInterface public ethUsdPriceFeed;
    PriceFeedInterface public gzeEthPriceFeed;

    address public wallet;
    uint public startDate;
    uint public endDate;
    uint public parcelUsd;
    uint public gzeBonus;

    uint public contributedGze;
    uint public contributedEth;
    uint public generatedParcels;
    uint public maxParcels = 10;

    event WalletUpdated(address indexed oldWallet, address indexed newWallet);
    event StartDateUpdated(uint oldStartDate, uint newStartDate);
    event EndDateUpdated(uint oldEndDate, uint newEndDate);
    event Contributed(address indexed addr, uint ethAmount, uint ethRefund, uint accountEthAmount, uint usdAmount, uint gzeAmount, uint contributedEth, uint contributedUsd, uint generatedGze, bool lockAccount);

    constructor(address _bttsToken, address _gzeToken, address _ethUsdPriceFeed, address _gzeEthPriceFeed, address _wallet, uint _startDate, uint _endDate, uint _parcelUsd, uint _gzeBonus) public {
        require(_bttsToken != 0 && _gzeToken != 0 && _ethUsdPriceFeed != 0 && _gzeEthPriceFeed != 0 && _wallet != 0);
        require(_startDate >= now && _endDate > _startDate);
        require(_parcelUsd > 0);
        initOwned(msg.sender);
        bttsToken = BTTSTokenInterface(_bttsToken);
        gzeToken = BTTSTokenInterface(_gzeToken);
        ethUsdPriceFeed = PriceFeedInterface(_ethUsdPriceFeed);
        gzeEthPriceFeed = PriceFeedInterface(_gzeEthPriceFeed);
        wallet = _wallet;
        startDate = _startDate;
        endDate = _endDate;
        parcelUsd = _parcelUsd;
        gzeBonus = _gzeBonus;
    }
    function setWallet(address _wallet) public onlyOwner {
        emit WalletUpdated(wallet, _wallet);
        wallet = _wallet;
    }
    function setStartDate(uint _startDate) public onlyOwner {
        require(_startDate >= now);
        emit StartDateUpdated(startDate, _startDate);
        startDate = _startDate;
    }
    function setEndDate(uint _endDate) public onlyOwner {
        require(_endDate >= now);
        emit EndDateUpdated(endDate, _endDate);
        endDate = _endDate;
    }

    function ethUsd() public view returns (uint rate, bool hasValue) {
        bytes32 value;
        (value, hasValue) = ethUsdPriceFeed.peek();
        if (hasValue) {
            rate = uint(value);
        }
    }
    function gzeEth() public view returns (uint rate, bool hasValue) {
        bytes32 value;
        (value, hasValue) = gzeEthPriceFeed.peek();
        if (hasValue) {
            rate = uint(value);
        }
    }
    function gzeUsd() public view returns (uint rate, bool hasValue) {
        bytes32 ethUsdValue;
        bool hasEthUsdValue;
        (ethUsdValue, hasEthUsdValue) = ethUsdPriceFeed.peek();
        bytes32 gzeEthValue;
        bool hasGzeEthValue;
        (gzeEthValue, hasGzeEthValue) = gzeEthPriceFeed.peek();
        if (hasEthUsdValue && hasGzeEthValue) {
            hasValue = true;
            rate = uint(ethUsdValue).mul(uint(gzeEthValue)).div(10**18);
        }
    }
    function parcelEth() public view returns (uint rate, bool hasValue) {
        uint _ethUsd;
        (_ethUsd, hasValue) = ethUsd();
        if (hasValue) {
            rate = parcelUsd.mul(10**18).div(_ethUsd);
        }
    }
    function parcelGzeWithoutBonus() public view returns (uint rate, bool hasValue) {
        uint _gzeUsd;
        (_gzeUsd, hasValue) = gzeUsd();
        if (hasValue) {
            rate = parcelUsd.mul(10**18).div(_gzeUsd);
        }
    }
    function parcelGze() public view returns (uint rate, bool hasValue) {
        uint _parcelGzeWithoutBonus;
        (_parcelGzeWithoutBonus, hasValue) = parcelGzeWithoutBonus();
        if (hasValue) {
            rate = _parcelGzeWithoutBonus.mul(gzeBonus.add(100)).div(100);
        }
    }

    function receiveApproval(address from, uint256 tokens, address token, bytes /* data */) public {
        require(now >= startDate && now <= endDate);
        // BK TODO: Owner check?, check parcel limit
        require(token == address(gzeToken));
        uint _parcelGze;
        bool hasValue;
        (_parcelGze, hasValue) = parcelGze();
        require(hasValue);
        uint parcels = tokens.div(_parcelGze);
        require(parcels > 0);
        uint gzeToTransfer = parcels.mul(_parcelGze);
        ERC20Interface(token).transferFrom(from, wallet, gzeToTransfer);
        bttsToken.mint(from, parcelUsd.mul(parcels), false);
    }
    function () public payable {
        require(now >= startDate && now <= endDate);
        // BK TODO: Owner check?, check parcel limit
        uint _parcelEth;
        bool hasValue;
        (_parcelEth, hasValue) = parcelEth();
        require(hasValue);
        uint parcels = msg.value.div(_parcelEth);
        require(parcels > 0);
        uint ethToTransfer = parcels.mul(_parcelEth);
        uint ethToRefund = msg.value.sub(ethToTransfer);
        if (ethToRefund > 0) {
            msg.sender.transfer(ethToRefund);
        }
        bttsToken.mint(msg.sender, parcelUsd.mul(parcels), false);
    }
    // function addPrecommitment(address tokenOwner, uint ethAmount, uint bonusPercent) public onlyOwner {
    //     require(!finalised);
    //     uint usdAmount = ethAmount.mul(usdPerKEther).div(10**uint(3 + 18));
    //     uint gzeAmount = gzeFromEth(ethAmount, bonusPercent);
    //     uint ethRefund = 0;
    //     generatedGze = generatedGze.add(gzeAmount);
    //     contributedEth = contributedEth.add(ethAmount);
    //     contributedUsd = contributedUsd.add(usdAmount);
    //     accountEthAmount[tokenOwner] = accountEthAmount[tokenOwner].add(ethAmount);
    //     bool lockAccount = accountEthAmount[tokenOwner] > lockedAccountThresholdEth();
    //     bttsToken.mint(tokenOwner, gzeAmount, lockAccount);
    //     emit Contributed(tokenOwner, ethAmount, ethRefund, accountEthAmount[tokenOwner], usdAmount, gzeAmount, contributedEth, contributedUsd, generatedGze, lockAccount);
    // }
}
