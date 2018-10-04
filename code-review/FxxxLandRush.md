# FxxxLandRush

Source file [../contracts/FxxxLandRush.sol](../contracts/FxxxLandRush.sol).

<br />

<hr />

```solidity
// BK Ok
pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// Fxxx Land Rush Contract - Purchase land parcels with GZE and ETH
//
// Deployed to : {TBA}
//
// Enjoy.
//
// (c) BokkyPooBah / Bok Consulting Pty Ltd for GazeCoin 2018. The MIT Licence.
// ----------------------------------------------------------------------------

// BK Next 5 Ok
import "Owned.sol";
import "SafeMath.sol";
import "BTTSTokenInterface110.sol";
import "PriceFeedInterface.sol";
import "BonusListInterface.sol";


// ----------------------------------------------------------------------------
// FxxxLandRush Contract
// ----------------------------------------------------------------------------
// BK Ok
contract FxxxLandRush is Owned, ApproveAndCallFallBack {
    // BK Ok
    using SafeMath for uint;

    // BK Ok
    uint private constant TENPOW18 = 10 ** 18;

    // BK Next 5 Ok
    BTTSTokenInterface public parcelToken;
    BTTSTokenInterface public gzeToken;
    PriceFeedInterface public ethUsdPriceFeed;
    PriceFeedInterface public gzeEthPriceFeed;
    BonusListInterface public bonusList;

    // BK Next 8 Ok
    address public wallet;
    uint public startDate;
    uint public endDate;
    uint public maxParcels;
    uint public parcelUsd;                  // USD per parcel, e.g., USD 1,500 * 10^18
    uint public usdLockAccountThreshold;    // e.g., USD 7,000 * 10^18
    uint public gzeBonusOffList;            // e.g., 20 = 20% bonus
    uint public gzeBonusOnList;             // e.g., 30 = 30% bonus

    // BK Next 4 Ok
    uint public parcelsSold;
    uint public contributedGze;
    uint public contributedEth;
    bool public finalised;

    // BK Next 9 Ok - Events
    event WalletUpdated(address indexed oldWallet, address indexed newWallet);
    event StartDateUpdated(uint oldStartDate, uint newStartDate);
    event EndDateUpdated(uint oldEndDate, uint newEndDate);
    event MaxParcelsUpdated(uint oldMaxParcels, uint newMaxParcels);
    event ParcelUsdUpdated(uint oldParcelUsd, uint newParcelUsd);
    event UsdLockAccountThresholdUpdated(uint oldUsdLockAccountThreshold, uint newUsdLockAccountThreshold);
    event GzeBonusOffListUpdated(uint oldGzeBonusOffList, uint newGzeBonusOffList);
    event GzeBonusOnListUpdated(uint oldGzeBonusOnList, uint newGzeBonusOnList);
    event Purchased(address indexed addr, uint parcels, uint gzeToTransfer, uint ethToTransfer, uint parcelsSold, uint contributedGze, uint contributedEth, bool lockAccount);

    // BK Ok - Constructor
    constructor(address _parcelToken, address _gzeToken, address _ethUsdPriceFeed, address _gzeEthPriceFeed, address _bonusList, address _wallet, uint _startDate, uint _endDate, uint _maxParcels, uint _parcelUsd, uint _usdLockAccountThreshold, uint _gzeBonusOffList, uint _gzeBonusOnList) public {
        // BK Next 5 Ok. _gzeBonus*List don't need to be `require(...)`-d as they can be 0
        require(_parcelToken != address(0) && _gzeToken != address(0));
        require(_ethUsdPriceFeed != address(0) && _gzeEthPriceFeed != address(0) && _bonusList != address(0));
        require(_wallet != address(0));
        require(_startDate >= now && _endDate > _startDate);
        require(_maxParcels > 0 && _parcelUsd > 0);
        // BK Ok - Initialisation executed
        initOwned(msg.sender);
        // BK Next 5 Ok
        parcelToken = BTTSTokenInterface(_parcelToken);
        gzeToken = BTTSTokenInterface(_gzeToken);
        ethUsdPriceFeed = PriceFeedInterface(_ethUsdPriceFeed);
        gzeEthPriceFeed = PriceFeedInterface(_gzeEthPriceFeed);
        bonusList = BonusListInterface(_bonusList);
        // BK Next 7 Ok
        wallet = _wallet;
        startDate = _startDate;
        endDate = _endDate;
        maxParcels = _maxParcels;
        parcelUsd = _parcelUsd;
        usdLockAccountThreshold = _usdLockAccountThreshold;
        gzeBonusOffList = _gzeBonusOffList;
        gzeBonusOnList = _gzeBonusOnList;
    }
    // BK Ok - Only owner can execute
    function setWallet(address _wallet) public onlyOwner {
        // BK Ok
        require(!finalised);
        // BK Ok
        require(_wallet != address(0));
        // BK Ok - Log event
        emit WalletUpdated(wallet, _wallet);
        // BK Ok
        wallet = _wallet;
    }
    // BK Ok - Only owner can execute
    function setStartDate(uint _startDate) public onlyOwner {
        // BK Ok
        require(!finalised);
        // BK Ok
        require(_startDate >= now);
        // BK Ok - Log event
        emit StartDateUpdated(startDate, _startDate);
        // BK Ok
        startDate = _startDate;
    }
    // BK Ok - Only owner can execute
    function setEndDate(uint _endDate) public onlyOwner {
        // BK Ok
        require(!finalised);
        // BK Ok
        require(_endDate > startDate);
        // BK Ok - Log event
        emit EndDateUpdated(endDate, _endDate);
        // BK Ok
        endDate = _endDate;
    }
    // BK Ok - Only owner can execute
    function setMaxParcels(uint _maxParcels) public onlyOwner {
        // BK Ok
        require(!finalised);
        // BK Ok
        require(_maxParcels >= parcelsSold);
        // BK Ok - Log event
        emit MaxParcelsUpdated(maxParcels, _maxParcels);
        // BK Ok
        maxParcels = _maxParcels;
    }
    // BK Ok - Only owner can execute
    function setParcelUsd(uint _parcelUsd) public onlyOwner {
        // BK Ok
        require(!finalised);
        // BK Ok
        require(_parcelUsd > 0);
        // BK Ok - Log event
        emit ParcelUsdUpdated(parcelUsd, _parcelUsd);
        // BK Ok
        parcelUsd = _parcelUsd;
    }
    // BK Ok - Only owner can execute
    function setUsdLockAccountThreshold(uint _usdLockAccountThreshold) public onlyOwner {
        // BK Ok
        require(!finalised);
        // BK Ok - Log event
        emit UsdLockAccountThresholdUpdated(usdLockAccountThreshold, _usdLockAccountThreshold);
        // BK Ok
        usdLockAccountThreshold = _usdLockAccountThreshold;
    }
    // BK Ok - Only owner can execute
    function setGzeBonusOffList(uint _gzeBonusOffList) public onlyOwner {
        // BK Ok
        require(!finalised);
        // BK Ok - Log event
        emit GzeBonusOffListUpdated(gzeBonusOffList, _gzeBonusOffList);
        // BK Ok
        gzeBonusOffList = _gzeBonusOffList;
    }
    // BK Ok - Only owner can execute
    function setGzeBonusOnList(uint _gzeBonusOnList) public onlyOwner {
        // BK Ok
        require(!finalised);
        // BK Ok - Log event
        emit GzeBonusOnListUpdated(gzeBonusOnList, _gzeBonusOnList);
        // BK Ok
        gzeBonusOnList = _gzeBonusOnList;
    }

    // BK Ok - View function
    function symbol() public view returns (string _symbol) {
        // BK Ok
        _symbol = parcelToken.symbol();
    }
    // BK Ok - View function
    function name() public view returns (string _name) {
        // BK Ok
        _name = parcelToken.name();
    }

    // USD per ETH, e.g., 221.99 * 10^18
    // BK Ok - View function
    function ethUsd() public view returns (uint _rate, bool _live) {
        // BK Ok
        return ethUsdPriceFeed.getRate();
    }
    // ETH per GZE, e.g., 0.00004366 * 10^18
    // BK Ok - View function
    function gzeEth() public view returns (uint _rate, bool _live) {
        // BK Ok
        return gzeEthPriceFeed.getRate();
    }
    // USD per GZE, e.g., 0.0096920834 * 10^18
    // BK Ok - View function
    function gzeUsd() public view returns (uint _rate, bool _live) {
        // BK Next 2 Ok
        uint _ethUsd;
        bool _ethUsdLive;
        // BK Ok
        (_ethUsd, _ethUsdLive) = ethUsdPriceFeed.getRate();
        // BK Next 2 Ok
        uint _gzeEth;
        bool _gzeEthLive;
        // BK Ok
        (_gzeEth, _gzeEthLive) = gzeEthPriceFeed.getRate();
        // BK Ok
        if (_ethUsdLive && _gzeEthLive) {
            // BK Ok
            _live = true;
            // BK Ok
            _rate = _ethUsd.mul(_gzeEth).div(TENPOW18);
        }
    }
    // ETH per parcel, e.g., 6.757061128879679264 * 10^18
    // BK Ok - View function
    function parcelEth() public view returns (uint _rate, bool _live) {
        // BK Ok
        uint _ethUsd;
        // BK Ok
        (_ethUsd, _live) = ethUsd();
        // BK Ok
        if (_live) {
            // BK Ok
            _rate = parcelUsd.mul(TENPOW18).div(_ethUsd);
        }
    }
    // GZE per parcel, without bonus, e.g., 154765.486231783766945298 * 10^18
    // BK Ok - View function
    function parcelGzeWithoutBonus() public view returns (uint _rate, bool _live) {
        // BK Ok
        uint _gzeUsd;
        // BK Ok
        (_gzeUsd, _live) = gzeUsd();
        // BK Ok
        if (_live) {
            // BK Ok
            _rate = parcelUsd.mul(TENPOW18).div(_gzeUsd);
        }
    }
    // GZE per parcel, with bonus but not on bonus list, e.g., 128971.238526486472454415 * 10^18
    // BK Ok - View function
    function parcelGzeWithBonusOffList() public view returns (uint _rate, bool _live) {
        // BK Ok
        uint _parcelGzeWithoutBonus;
        // BK Ok
        (_parcelGzeWithoutBonus, _live) = parcelGzeWithoutBonus();
        // BK Ok
        if (_live) {
            // BK Ok
            _rate = _parcelGzeWithoutBonus.mul(100).div(gzeBonusOffList.add(100));
        }
    }
    // GZE per parcel, with bonus and on bonus list, e.g., 119050.374024449051496383 * 10^18
    // BK Ok - View function
    function parcelGzeWithBonusOnList() public view returns (uint _rate, bool _live) {
        // BK Ok
        uint _parcelGzeWithoutBonus;
        // BK Ok
        (_parcelGzeWithoutBonus, _live) = parcelGzeWithoutBonus();
        // BK Ok
        if (_live) {
            // BK Ok
            _rate = _parcelGzeWithoutBonus.mul(100).div(gzeBonusOnList.add(100));
        }
    }

    // Account contributes by:
    // 1. calling GZE.approve(landRushAddress, tokens)
    // 2. calling this.purchaseWithGze(tokens)
    // BK Ok - Any account can purchase parcels, but must have approve(...)-d the right amount of GZE tokens
    function purchaseWithGze(uint256 tokens) public {
        // BK Ok
        require(gzeToken.allowance(msg.sender, this) >= tokens);
        // BK Ok
        receiveApproval(msg.sender, tokens, gzeToken, "");
    }
    // Account contributes by calling GZE.approveAndCall(landRushAddress, tokens, "")
    // BK Ok - Any account can purchase parcels with GZE.approveAndCall(landRushAddress, tokens, "")
    function receiveApproval(address from, uint256 tokens, address token, bytes /* data */) public {
        // BK Ok
        require(now >= startDate && now <= endDate);
        // BK Ok
        require(token == address(gzeToken));
        // BK Next 2 Ok
        uint _parcelGze;
        bool _live;
        // BK Ok
        if (bonusList.isInBonusList(from)) {
            // BK Ok
            (_parcelGze, _live) = parcelGzeWithBonusOnList();
        // BK Ok
        } else {
            // BK Ok
            (_parcelGze, _live) = parcelGzeWithBonusOffList();
        }
        // BK Ok
        require(_live);
        // BK Ok
        uint parcels = tokens.div(_parcelGze);
        // BK Ok
        if (parcelsSold.add(parcels) >= maxParcels) {
            // BK Ok
            parcels = maxParcels.sub(parcelsSold);
        }
        uint gzeToTransfer = parcels.mul(_parcelGze);
        // BK Ok
        contributedGze = contributedGze.add(gzeToTransfer);
        // BK Ok
        require(ERC20Interface(token).transferFrom(from, wallet, gzeToTransfer));
        // BK Ok
        bool lock = mintParcelTokens(from, parcels);
        // BK Ok - Log event
        emit Purchased(from, parcels, gzeToTransfer, 0, parcelsSold, contributedGze, contributedEth, lock);
    }
    // Account contributes by sending ETH
    // BK Ok - Any account can purchase with ETH
    function () public payable {
        // BK Ok
        require(now >= startDate && now <= endDate);
        // BK Next 2 Ok
        uint _parcelEth;
        bool _live;
        // BK Ok
        (_parcelEth, _live) = parcelEth();
        // BK Ok
        require(_live);
        // BK Ok
        uint parcels = msg.value.div(_parcelEth);
        // BK Ok
        if (parcelsSold.add(parcels) >= maxParcels) {
            // BK Ok
            parcels = maxParcels.sub(parcelsSold);
        }
        uint ethToTransfer = parcels.mul(_parcelEth);
        // BK Ok
        contributedEth = contributedEth.add(ethToTransfer);
        // BK Ok
        uint ethToRefund = msg.value.sub(ethToTransfer);
        // BK Ok
        if (ethToRefund > 0) {
            // BK Ok
            msg.sender.transfer(ethToRefund);
        }
        // BK Ok
        bool lock = mintParcelTokens(msg.sender, parcels);
        // BK Ok - Log event
        emit Purchased(msg.sender, parcels, 0, ethToTransfer, parcelsSold, contributedGze, contributedEth, lock);
    }
    // Contract owner allocates parcels to tokenOwner for offline purchase
    // BK Ok - Owner can mint for offline purchases
    function offlinePurchase(address tokenOwner, uint parcels) public onlyOwner {
        // BK Ok
        require(!finalised);
        // BK Ok
        if (parcelsSold.add(parcels) >= maxParcels) {
            // BK Ok
            parcels = maxParcels.sub(parcelsSold);
        }
        // BK Ok
        bool lock = mintParcelTokens(tokenOwner, parcels);
        // BK Ok - Log event
        emit Purchased(tokenOwner, parcels, 0, 0, parcelsSold, contributedGze, contributedEth, lock);
    }
    // Internal function to mint tokens and disable minting if maxParcels sold
    // BK Ok - Internal function
    function mintParcelTokens(address account, uint parcels) internal returns (bool _lock) {
        // BK Ok
        require(parcels > 0);
        // BK Ok
        parcelsSold = parcelsSold.add(parcels);
        // BK Ok
        _lock = parcelToken.balanceOf(account).add(parcelUsd.mul(parcels)) >= usdLockAccountThreshold;
        // BK Ok
        require(parcelToken.mint(account, parcelUsd.mul(parcels), _lock));
        // BK Ok
        if (parcelsSold >= maxParcels) {
            // BK Ok
            parcelToken.disableMinting();
            // BK Ok
            finalised = true;
        }
    }
    // Contract owner finalises to disable parcel minting
    // BK Ok - Only owner can execute
    function finalise() public onlyOwner {
        // BK Ok
        require(!finalised);
        // BK Ok
        require(now > endDate || parcelsSold >= maxParcels);
        // BK Ok
        parcelToken.disableMinting();
        // BK Ok
        finalised = true;
    }
}

```
