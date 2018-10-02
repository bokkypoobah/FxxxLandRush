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

import "Owned.sol";
import "BTTSTokenInterface110.sol";
import "PriceFeedInterface.sol";
import "BonusListInterface.sol";


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
    BonusListInterface public bonusList;

    address public wallet;
    uint public startDate;
    uint public endDate;
    uint public maxParcels;
    uint public parcelUsd;          // USD per parcel, e.g., USD 1,500 * 10^18
    uint public gzeBonusOffList;    // e.g., 20 = 20% bonus
    uint public gzeBonusOnList;     // e.g., 30 = 30% bonus

    uint public parcelsSold;
    uint public contributedGze;
    uint public contributedEth;
    bool public finalised;

    event WalletUpdated(address indexed oldWallet, address indexed newWallet);
    event StartDateUpdated(uint oldStartDate, uint newStartDate);
    event EndDateUpdated(uint oldEndDate, uint newEndDate);
    event MaxParcelsUpdated(uint oldMaxParcels, uint newMaxParcels);
    event ParcelUsdUpdated(uint oldParcelUsd, uint newParcelUsd);
    event GzeBonusOffListUpdated(uint oldGzeBonusOffList, uint newGzeBonusOffList);
    event GzeBonusOnListUpdated(uint oldGzeBonusOnList, uint newGzeBonusOnList);
    event Purchased(address indexed addr, uint parcels, uint gzeToTransfer, uint ethToTransfer, uint parcelsSold, uint contributedGze, uint contributedEth);

    constructor(address _parcelToken, address _gzeToken, address _ethUsdPriceFeed, address _gzeEthPriceFeed, address _bonusList, address _wallet, uint _startDate, uint _endDate, uint _maxParcels, uint _parcelUsd, uint _gzeBonusOffList, uint _gzeBonusOnList) public {
        require(_parcelToken != address(0) && _gzeToken != address(0));
        require(_ethUsdPriceFeed != address(0) && _gzeEthPriceFeed != address(0) && _bonusList != address(0));
        require(_wallet != address(0));
        require(_startDate >= now && _endDate > _startDate);
        require(_maxParcels > 0 && _parcelUsd > 0);
        initOwned(msg.sender);
        parcelToken = BTTSTokenInterface(_parcelToken);
        gzeToken = BTTSTokenInterface(_gzeToken);
        ethUsdPriceFeed = PriceFeedInterface(_ethUsdPriceFeed);
        gzeEthPriceFeed = PriceFeedInterface(_gzeEthPriceFeed);
        bonusList = BonusListInterface(_bonusList);
        wallet = _wallet;
        startDate = _startDate;
        endDate = _endDate;
        maxParcels = _maxParcels;
        parcelUsd = _parcelUsd;
        gzeBonusOffList = _gzeBonusOffList;
        gzeBonusOnList = _gzeBonusOnList;
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
    function setGzeBonusOffList(uint _gzeBonusOffList) public onlyOwner {
        require(!finalised);
        emit GzeBonusOffListUpdated(gzeBonusOffList, _gzeBonusOffList);
        gzeBonusOffList = _gzeBonusOffList;
    }
    function setGzeBonusOnList(uint _gzeBonusOnList) public onlyOwner {
        require(!finalised);
        emit GzeBonusOnListUpdated(gzeBonusOnList, _gzeBonusOnList);
        gzeBonusOnList = _gzeBonusOnList;
    }

    function symbol() public view returns (string _symbol) {
        _symbol = parcelToken.symbol();
    }
    function name() public view returns (string _name) {
        _name = parcelToken.name();
    }

    // USD per ETH, e.g., 231.11 * 10^18
    function ethUsd() public view returns (uint rate, bool hasValue) {
        bytes32 value;
        (value, hasValue) = ethUsdPriceFeed.peek();
        if (hasValue) {
            rate = uint(value);
        }
    }
    // ETH per GZE, e.g., 0.00005197 * 10^18
    function gzeEth() public view returns (uint rate, bool hasValue) {
        bytes32 value;
        (value, hasValue) = gzeEthPriceFeed.peek();
        if (hasValue) {
            rate = uint(value);
        }
    }
    // USD per GZE, e.g., 0.0120107867 * 10^18
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
    // ETH per parcel, e.g., 6.49041581930682359 * 10^18
    function parcelEth() public view returns (uint rate, bool hasValue) {
        uint _ethUsd;
        (_ethUsd, hasValue) = ethUsd();
        if (hasValue) {
            rate = parcelUsd.mul(10**18).div(_ethUsd);
        }
    }
    // GZE per parcel, without bonus, e.g., 124887.739451737994814278 * 10^18
    function parcelGzeWithoutBonus() public view returns (uint rate, bool hasValue) {
        uint _gzeUsd;
        (_gzeUsd, hasValue) = gzeUsd();
        if (hasValue) {
            rate = parcelUsd.mul(10**18).div(_gzeUsd);
        }
    }
    // GZE per parcel, with bonus but not on bonus list, e.g., 104073.116209781662345231 * 10^18
    function parcelGzeWithBonusOffList() public view returns (uint rate, bool hasValue) {
        uint _parcelGzeWithoutBonus;
        (_parcelGzeWithoutBonus, hasValue) = parcelGzeWithoutBonus();
        if (hasValue) {
            rate = _parcelGzeWithoutBonus.mul(100).div(gzeBonusOffList.add(100));
        }
    }
    // GZE per parcel, with bonus and on bonus list, e.g., 96067.49188595230370329 * 10^18
    function parcelGzeWithBonusOnList() public view returns (uint rate, bool hasValue) {
        uint _parcelGzeWithoutBonus;
        (_parcelGzeWithoutBonus, hasValue) = parcelGzeWithoutBonus();
        if (hasValue) {
            rate = _parcelGzeWithoutBonus.mul(100).div(gzeBonusOnList.add(100));
        }
    }

    // Account contributes by:
    // 1. calling GZE.approve(landRushAddress, tokens)
    // 2. calling this.purchaseWithGze(tokens)
    function purchaseWithGze(uint256 tokens) public {
        require(gzeToken.allowance(msg.sender, this) >= tokens);
        receiveApproval(msg.sender, tokens, gzeToken, "");
    }
    // Account contributes by calling GZE.approveAndCall(landRushAddress, tokens, "")
    function receiveApproval(address from, uint256 tokens, address token, bytes /* data */) public {
        require(now >= startDate && now <= endDate);
        require(token == address(gzeToken));
        uint _parcelGze;
        bool hasValue;
        if (bonusList.isInBonusList(from)) {
            (_parcelGze, hasValue) = parcelGzeWithBonusOnList();
        } else {
            (_parcelGze, hasValue) = parcelGzeWithBonusOffList();
        }
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
        emit Purchased(msg.sender, parcels, gzeToTransfer, 0, parcelsSold, contributedGze, contributedEth);
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
        emit Purchased(msg.sender, parcels, 0, ethToTransfer, parcelsSold, contributedGze, contributedEth);
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
        emit Purchased(tokenOwner, parcels, 0, 0, parcelsSold, contributedGze, contributedEth);
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
