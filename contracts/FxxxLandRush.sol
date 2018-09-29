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

/// ----------------------------------------------------------------------------
// Bonus list interface
// ----------------------------------------------------------------------------
contract BonusListInterface {
    mapping(address => uint) public bonusList;
}


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
    uint8 public constant TOKEN_DECIMALS = 18;

    address public wallet;
    address public teamWallet = 0xb4eC550893D31763C02EBDa44Dff90b7b5a62656;
    uint public constant TEAM_PERCENT_GZE = 30;

    BonusListInterface public bonusList;
    uint public constant TIER1_BONUS = 50;
    uint public constant TIER2_BONUS = 20;
    uint public constant TIER3_BONUS = 15;

    uint public startDate;
    uint public endDate;

    // ETH/USD 9 Dec 2017 11:00 EST => 9 Dec 2017 16:00 UTC => 10 Dec 2017 03:00 AEST => 489.44 from CMC
    uint public parcelUsd;
    uint public gzeBonus;
    uint public usdPerKEther = 489440;
    uint public constant USD_CENT_PER_GZE = 35;
    uint public constant CAP_USD = 35000000;
    uint public constant MIN_CONTRIBUTION_ETH = 0.01 ether;

    uint public contributedEth;
    uint public contributedUsd;
    uint public generatedGze;

    //  AUD 10,000 = ~ USD 7,500
    uint public lockedAccountThresholdUsd = 7500;
    mapping(address => uint) public accountEthAmount;

    bool public precommitmentAdjusted;
    bool public finalised;

    event WalletUpdated(address indexed oldWallet, address indexed newWallet);
    event TeamWalletUpdated(address indexed oldTeamWallet, address indexed newTeamWallet);
    event BonusListUpdated(address indexed oldBonusList, address indexed newBonusList);
    event StartDateUpdated(uint oldStartDate, uint newStartDate);
    event EndDateUpdated(uint oldEndDate, uint newEndDate);
    event UsdPerKEtherUpdated(uint oldUsdPerKEther, uint newUsdPerKEther);
    event LockedAccountThresholdUsdUpdated(uint oldEthLockedThreshold, uint newEthLockedThreshold);
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
    function setTeamWallet(address _teamWallet) public onlyOwner {
        emit TeamWalletUpdated(teamWallet, _teamWallet);
        teamWallet = _teamWallet;
    }
    function setBonusList(address _bonusList) public onlyOwner {
        require(now <= startDate);
        emit BonusListUpdated(address(bonusList), _bonusList);
        bonusList = BonusListInterface(_bonusList);
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
    function setUsdPerKEther(uint _usdPerKEther) public onlyOwner {
        require(now <= startDate);
        emit UsdPerKEtherUpdated(usdPerKEther, _usdPerKEther);
        usdPerKEther = _usdPerKEther;
    }
    function setLockedAccountThresholdUsd(uint _lockedAccountThresholdUsd) public onlyOwner {
        require(now <= startDate);
        emit LockedAccountThresholdUsdUpdated(lockedAccountThresholdUsd, _lockedAccountThresholdUsd);
        lockedAccountThresholdUsd = _lockedAccountThresholdUsd;
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

    function capEth() public view returns (uint) {
        return CAP_USD * 10**uint(3 + 18) / usdPerKEther;
    }
    function gzeFromEth(uint ethAmount, uint bonusPercent) public view returns (uint) {
        return usdPerKEther * ethAmount * (100 + bonusPercent) / 10**uint(3 + 2 - 2) / USD_CENT_PER_GZE;
    }
    function gzePerEth() public view returns (uint) {
        return gzeFromEth(10**18, 0);
    }
    function lockedAccountThresholdEth() public view returns (uint) {
        return lockedAccountThresholdUsd * 10**uint(3 + 18) / usdPerKEther;
    }
    function getBonusPercent(address addr) public view returns (uint bonusPercent) {
        uint tier = bonusList.bonusList(addr);
        if (tier == 1) {
            bonusPercent = TIER1_BONUS;
        } else if (tier == 2) {
            bonusPercent = TIER2_BONUS;
        } else if (tier == 3) {
            bonusPercent = TIER3_BONUS;
        } else {
            bonusPercent = 0;
        }
    }
    function receiveApproval(address from, uint256 tokens, address token, bytes /* data */) public {
        require(token == address(gzeToken));
        ERC20Interface(token).transferFrom(from, address(this), tokens);
        bttsToken.mint(from, tokens, false);
    }
    function () public payable {
        require((now >= startDate && now <= endDate) || (msg.sender == owner && msg.value == MIN_CONTRIBUTION_ETH));
        require(contributedEth < capEth());
        require(msg.value >= MIN_CONTRIBUTION_ETH);
        uint bonusPercent = getBonusPercent(msg.sender);
        uint ethAmount = msg.value;
        uint ethRefund = 0;
        if (contributedEth.add(ethAmount) > capEth()) {
            ethAmount = capEth().sub(contributedEth);
            ethRefund = msg.value.sub(ethAmount);
        }
        uint usdAmount = ethAmount.mul(usdPerKEther).div(10**uint(3 + 18));
        uint gzeAmount = gzeFromEth(ethAmount, bonusPercent);
        generatedGze = generatedGze.add(gzeAmount);
        contributedEth = contributedEth.add(ethAmount);
        contributedUsd = contributedUsd.add(usdAmount);
        accountEthAmount[msg.sender] = accountEthAmount[msg.sender].add(ethAmount);
        bool lockAccount = accountEthAmount[msg.sender] > lockedAccountThresholdEth();
        bttsToken.mint(msg.sender, gzeAmount, lockAccount);
        if (ethAmount > 0) {
            wallet.transfer(ethAmount);
        }
        emit Contributed(msg.sender, ethAmount, ethRefund, accountEthAmount[msg.sender], usdAmount, gzeAmount, contributedEth, contributedUsd, generatedGze, lockAccount);
        if (ethRefund > 0) {
            msg.sender.transfer(ethRefund);
        }
    }

    function addPrecommitment(address tokenOwner, uint ethAmount, uint bonusPercent) public onlyOwner {
        require(!finalised);
        uint usdAmount = ethAmount.mul(usdPerKEther).div(10**uint(3 + 18));
        uint gzeAmount = gzeFromEth(ethAmount, bonusPercent);
        uint ethRefund = 0;
        generatedGze = generatedGze.add(gzeAmount);
        contributedEth = contributedEth.add(ethAmount);
        contributedUsd = contributedUsd.add(usdAmount);
        accountEthAmount[tokenOwner] = accountEthAmount[tokenOwner].add(ethAmount);
        bool lockAccount = accountEthAmount[tokenOwner] > lockedAccountThresholdEth();
        bttsToken.mint(tokenOwner, gzeAmount, lockAccount);
        emit Contributed(tokenOwner, ethAmount, ethRefund, accountEthAmount[tokenOwner], usdAmount, gzeAmount, contributedEth, contributedUsd, generatedGze, lockAccount);
    }
    function addPrecommitmentAdjustment(address tokenOwner, uint gzeAmount) public onlyOwner {
        require(now > endDate || contributedEth >= capEth());
        require(!finalised);
        uint ethAmount = 0;
        uint usdAmount = 0;
        uint ethRefund = 0;
        generatedGze = generatedGze.add(gzeAmount);
        bool lockAccount = accountEthAmount[tokenOwner] > lockedAccountThresholdEth();
        bttsToken.mint(tokenOwner, gzeAmount, lockAccount);
        precommitmentAdjusted = true;
        emit Contributed(tokenOwner, ethAmount, ethRefund, accountEthAmount[tokenOwner], usdAmount, gzeAmount, contributedEth, contributedUsd, generatedGze, lockAccount);
    }
    function roundUp(uint a) public pure returns (uint) {
        uint multiple = 10**uint(TOKEN_DECIMALS);
        uint remainder = a % multiple;
        if (remainder > 0) {
            return a.add(multiple).sub(remainder);
        }
    }
    function finalise() public onlyOwner {
        require(!finalised);
        require(precommitmentAdjusted);
        require(now > endDate || contributedEth >= capEth());
        uint total = generatedGze.mul(100).div(uint(100).sub(TEAM_PERCENT_GZE));
        uint amountTeam = total.mul(TEAM_PERCENT_GZE).div(100);
        generatedGze = generatedGze.add(amountTeam);
        uint rounded = roundUp(generatedGze);
        if (rounded > generatedGze) {
            uint dust = rounded.sub(generatedGze);
            generatedGze = generatedGze.add(dust);
            amountTeam = amountTeam.add(dust);
        }
        bttsToken.mint(teamWallet, amountTeam, false);
        bttsToken.disableMinting();
        finalised = true;
    }
}
