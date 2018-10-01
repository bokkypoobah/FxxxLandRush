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

    BTTSTokenInterface public parcelToken;
    BTTSTokenInterface public gzeToken;
    PriceFeedInterface public ethUsdPriceFeed;
    PriceFeedInterface public gzeEthPriceFeed;

    address public wallet;
    uint public startDate;
    uint public endDate;
    uint public maxParcels;
    uint public parcelUsd;      // USD per parcel
    uint public gzeBonus;       // 30 = 30% bonus

    uint public parcelsSold;
    uint public contributedGze;
    uint public contributedEth;
    bool public finalised;

    event WalletUpdated(address indexed oldWallet, address indexed newWallet);
    event StartDateUpdated(uint oldStartDate, uint newStartDate);
    event EndDateUpdated(uint oldEndDate, uint newEndDate);
    event MaxParcelsUpdated(uint oldMaxParcels, uint newMaxParcels);
    event ParcelUsdUpdated(uint oldParcelUsd, uint newParcelUsd);
    event GzeBonusUpdated(uint oldGzeBonus, uint newGzeBonus);
    event Contributed(address indexed addr, uint parcels, uint gzeToTransfer, uint ethToTransfer, uint parcelsSold, uint contributedGze, uint contributedEth);

    constructor(address _parcelToken, address _gzeToken, address _ethUsdPriceFeed, address _gzeEthPriceFeed, address _wallet, uint _startDate, uint _endDate, uint _maxParcels, uint _parcelUsd, uint _gzeBonus) public {
        require(_parcelToken != address(0) && _gzeToken != address(0));
        require(_ethUsdPriceFeed != address(0) && _gzeEthPriceFeed != address(0));
        require(_wallet != address(0));
        require(_startDate >= now && _endDate > _startDate);
        require(_maxParcels > 0 && _parcelUsd > 0);
        initOwned(msg.sender);
        parcelToken = BTTSTokenInterface(_parcelToken);
        gzeToken = BTTSTokenInterface(_gzeToken);
        ethUsdPriceFeed = PriceFeedInterface(_ethUsdPriceFeed);
        gzeEthPriceFeed = PriceFeedInterface(_gzeEthPriceFeed);
        wallet = _wallet;
        startDate = _startDate;
        endDate = _endDate;
        maxParcels = _maxParcels;
        parcelUsd = _parcelUsd;
        gzeBonus = _gzeBonus;
    }
    function setWallet(address _wallet) public onlyOwner {
        require(!finalised);
        require(_wallet != address(0));
        emit WalletUpdated(wallet, _wallet);
        wallet = _wallet;
    }
    function setStartDate(uint _startDate) public onlyOwner {
        require(!finalised);
        require(_startDate >= now);
        emit StartDateUpdated(startDate, _startDate);
        startDate = _startDate;
    }
    function setEndDate(uint _endDate) public onlyOwner {
        require(!finalised);
        require(_endDate >= now);
        emit EndDateUpdated(endDate, _endDate);
        endDate = _endDate;
    }
    function setMaxParcels(uint _maxParcels) public onlyOwner {
        require(!finalised);
        require(_maxParcels > parcelsSold);
        emit MaxParcelsUpdated(maxParcels, _maxParcels);
        maxParcels = _maxParcels;
    }
    function setParcelUsd(uint _parcelUsd) public onlyOwner {
        require(!finalised);
        require(_parcelUsd > 0);
        emit ParcelUsdUpdated(parcelUsd, _parcelUsd);
        parcelUsd = _parcelUsd;
    }
    function setGzeBonus(uint _gzeBonus) public onlyOwner {
        require(!finalised);
        emit GzeBonusUpdated(gzeBonus, _gzeBonus);
        gzeBonus = _gzeBonus;
    }

    function symbol() public view returns (string _symbol) {
        _symbol = parcelToken.symbol();
    }
    function name() public view returns (string _name) {
        _name = parcelToken.name();
    }

    // USD per ETH
    function ethUsd() public view returns (uint rate, bool hasValue) {
        bytes32 value;
        (value, hasValue) = ethUsdPriceFeed.peek();
        if (hasValue) {
            rate = uint(value);
        }
    }
    // ETH per GZE
    function gzeEth() public view returns (uint rate, bool hasValue) {
        bytes32 value;
        (value, hasValue) = gzeEthPriceFeed.peek();
        if (hasValue) {
            rate = uint(value);
        }
    }
    // USD per GZE
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
    // ETH per parcel
    function parcelEth() public view returns (uint rate, bool hasValue) {
        uint _ethUsd;
        (_ethUsd, hasValue) = ethUsd();
        if (hasValue) {
            rate = parcelUsd.mul(10**18).div(_ethUsd);
        }
    }
    // GZE per parcel, without bonus
    function parcelGzeWithoutBonus() public view returns (uint rate, bool hasValue) {
        uint _gzeUsd;
        (_gzeUsd, hasValue) = gzeUsd();
        if (hasValue) {
            rate = parcelUsd.mul(10**18).div(_gzeUsd);
        }
    }
    // GZE per parcel, with bonus
    function parcelGze() public view returns (uint rate, bool hasValue) {
        uint _parcelGzeWithoutBonus;
        (_parcelGzeWithoutBonus, hasValue) = parcelGzeWithoutBonus();
        if (hasValue) {
            rate = _parcelGzeWithoutBonus.mul(gzeBonus.add(100)).div(100);
        }
    }

    // Account contributes by calling GZE.approveAndCall(landRushAddress, tokens, "")
    function receiveApproval(address from, uint256 tokens, address token, bytes /* data */) public {
        require(now >= startDate && now <= endDate);
        require(token == address(gzeToken));
        uint _parcelGze;
        bool hasValue;
        (_parcelGze, hasValue) = parcelGze();
        require(hasValue);
        uint parcels = tokens.div(_parcelGze);
        if (parcelsSold.add(parcels) >= maxParcels) {
            parcels = maxParcels.sub(parcelsSold);
        }
        require(parcels > 0);
        parcelsSold = parcelsSold.add(parcels);
        uint gzeToTransfer = parcels.mul(_parcelGze);
        contributedGze = contributedGze.add(gzeToTransfer);
        ERC20Interface(token).transferFrom(from, wallet, gzeToTransfer);
        parcelToken.mint(from, parcelUsd.mul(parcels), false);
        emit Contributed(msg.sender, parcels, gzeToTransfer, 0, parcelsSold, contributedGze, contributedEth);
        if (parcelsSold >= maxParcels) {
            parcelToken.disableMinting();
            finalised = true;
        }
    }
    // Account contributes by sending ETH
    function () public payable {
        require(now >= startDate && now <= endDate);
        uint _parcelEth;
        bool hasValue;
        (_parcelEth, hasValue) = parcelEth();
        require(hasValue);
        uint parcels = msg.value.div(_parcelEth);
        if (parcelsSold.add(parcels) >= maxParcels) {
            parcels = maxParcels.sub(parcelsSold);
        }
        require(parcels > 0);
        parcelsSold = parcelsSold.add(parcels);
        uint ethToTransfer = parcels.mul(_parcelEth);
        contributedEth = contributedEth.add(ethToTransfer);
        uint ethToRefund = msg.value.sub(ethToTransfer);
        if (ethToRefund > 0) {
            msg.sender.transfer(ethToRefund);
        }
        parcelToken.mint(msg.sender, parcelUsd.mul(parcels), false);
        emit Contributed(msg.sender, parcels, 0, ethToTransfer, parcelsSold, contributedGze, contributedEth);
        if (parcelsSold >= maxParcels) {
            parcelToken.disableMinting();
            finalised = true;
        }
    }
    // Contract owner allocates parcels to tokenOwner for offline purchase
    function offlinePurchase(address tokenOwner, uint parcels) public onlyOwner {
        require(!finalised);
        if (parcelsSold.add(parcels) >= maxParcels) {
            parcels = maxParcels.sub(parcelsSold);
        }
        require(parcels > 0);
        parcelsSold = parcelsSold.add(parcels);
        parcelToken.mint(tokenOwner, parcelUsd.mul(parcels), false);
        emit Contributed(tokenOwner, parcels, 0, 0, parcelsSold, contributedGze, contributedEth);
        if (parcelsSold >= maxParcels) {
            parcelToken.disableMinting();
            finalised = true;
        }
    }
    // Contract owner finalises to disable parcel minting
    function finalise() public onlyOwner {
        require(!finalised);
        require(now > endDate || parcelsSold >= maxParcels);
        parcelToken.disableMinting();
        finalised = true;
    }
}
