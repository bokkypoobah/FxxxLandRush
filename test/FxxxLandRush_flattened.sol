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


// ----------------------------------------------------------------------------
// BokkyPooBah's Token Teleportation Service Interface v1.10
//
// https://github.com/bokkypoobah/BokkyPooBahsTokenTeleportationServiceSmartContract
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2018. The MIT Licence.
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------
contract ERC20Interface {
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);
}

// ----------------------------------------------------------------------------
// Contracts that can have tokens approved, and then a function executed
// ----------------------------------------------------------------------------
contract ApproveAndCallFallBack {
    function receiveApproval(address from, uint256 tokens, address token, bytes data) public;
}


// ----------------------------------------------------------------------------
// BokkyPooBah's Token Teleportation Service Interface v1.10
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2018. The MIT Licence.
// ----------------------------------------------------------------------------
contract BTTSTokenInterface is ERC20Interface {
    uint public constant bttsVersion = 110;

    bytes public constant signingPrefix = "\x19Ethereum Signed Message:\n32";
    bytes4 public constant signedTransferSig = "\x75\x32\xea\xac";
    bytes4 public constant signedApproveSig = "\xe9\xaf\xa7\xa1";
    bytes4 public constant signedTransferFromSig = "\x34\x4b\xcc\x7d";
    bytes4 public constant signedApproveAndCallSig = "\xf1\x6f\x9b\x53";

    event OwnershipTransferred(address indexed from, address indexed to);
    event MinterUpdated(address from, address to);
    event Mint(address indexed tokenOwner, uint tokens, bool lockAccount);
    event MintingDisabled();
    event TransfersEnabled();
    event AccountUnlocked(address indexed tokenOwner);

    function symbol() public view returns (string);
    function name() public view returns (string);
    function decimals() public view returns (uint8);

    function approveAndCall(address spender, uint tokens, bytes data) public returns (bool success);

    // ------------------------------------------------------------------------
    // signed{X} functions
    // ------------------------------------------------------------------------
    function signedTransferHash(address tokenOwner, address to, uint tokens, uint fee, uint nonce) public view returns (bytes32 hash);
    function signedTransferCheck(address tokenOwner, address to, uint tokens, uint fee, uint nonce, bytes sig, address feeAccount) public view returns (CheckResult result);
    function signedTransfer(address tokenOwner, address to, uint tokens, uint fee, uint nonce, bytes sig, address feeAccount) public returns (bool success);

    function signedApproveHash(address tokenOwner, address spender, uint tokens, uint fee, uint nonce) public view returns (bytes32 hash);
    function signedApproveCheck(address tokenOwner, address spender, uint tokens, uint fee, uint nonce, bytes sig, address feeAccount) public view returns (CheckResult result);
    function signedApprove(address tokenOwner, address spender, uint tokens, uint fee, uint nonce, bytes sig, address feeAccount) public returns (bool success);

    function signedTransferFromHash(address spender, address from, address to, uint tokens, uint fee, uint nonce) public view returns (bytes32 hash);
    function signedTransferFromCheck(address spender, address from, address to, uint tokens, uint fee, uint nonce, bytes sig, address feeAccount) public view returns (CheckResult result);
    function signedTransferFrom(address spender, address from, address to, uint tokens, uint fee, uint nonce, bytes sig, address feeAccount) public returns (bool success);

    function signedApproveAndCallHash(address tokenOwner, address spender, uint tokens, bytes _data, uint fee, uint nonce) public view returns (bytes32 hash);
    function signedApproveAndCallCheck(address tokenOwner, address spender, uint tokens, bytes _data, uint fee, uint nonce, bytes sig, address feeAccount) public view returns (CheckResult result);
    function signedApproveAndCall(address tokenOwner, address spender, uint tokens, bytes _data, uint fee, uint nonce, bytes sig, address feeAccount) public returns (bool success);

    function mint(address tokenOwner, uint tokens, bool lockAccount) public returns (bool success);
    function unlockAccount(address tokenOwner) public;
    function disableMinting() public;
    function enableTransfers() public;

    // ------------------------------------------------------------------------
    // signed{X}Check return status
    // ------------------------------------------------------------------------
    enum CheckResult {
        Success,                           // 0 Success
        NotTransferable,                   // 1 Tokens not transferable yet
        AccountLocked,                     // 2 Account locked
        SignerMismatch,                    // 3 Mismatch in signing account
        InvalidNonce,                      // 4 Invalid nonce
        InsufficientApprovedTokens,        // 5 Insufficient approved tokens
        InsufficientApprovedTokensForFees, // 6 Insufficient approved tokens for fees
        InsufficientTokens,                // 7 Insufficient tokens
        InsufficientTokensForFees,         // 8 Insufficient tokens for fees
        OverflowError                      // 9 Overflow error
    }
}

// ----------------------------------------------------------------------------
// Owned contract
// ----------------------------------------------------------------------------
contract Owned {
    address public owner;
    address public newOwner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function initOwned(address _owner) internal {
        owner = _owner;
    }
    function transferOwnership(address _newOwner) public onlyOwner {
        newOwner = _newOwner;
    }
    function acceptOwnership() public {
        require(msg.sender == newOwner);
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        newOwner = address(0);
    }
    function transferOwnershipImmediately(address _newOwner) public onlyOwner {
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }
}

// ----------------------------------------------------------------------------
// Pricefeed Interface compatible with MakerDAO's "pip" PriceFeed
// ----------------------------------------------------------------------------
contract PriceFeedInterface {
    function peek() public view returns (bytes32 _value, bool _hasValue);
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

    BTTSTokenInterface public parcelToken;
    BTTSTokenInterface public gzeToken;
    PriceFeedInterface public ethUsdPriceFeed;
    PriceFeedInterface public gzeEthPriceFeed;

    address public wallet;
    uint public startDate;
    uint public endDate;
    uint public maxParcels;
    uint public parcelUsd;
    uint public gzeBonus;

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
        require(_wallet != address(0));
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
    function setMaxParcels(uint _maxParcels) public onlyOwner {
        require(_maxParcels > 0);
        emit MaxParcelsUpdated(maxParcels, _maxParcels);
        maxParcels = _maxParcels;
    }
    function setParcelUsd(uint _parcelUsd) public onlyOwner {
        require(_parcelUsd > 0);
        emit ParcelUsdUpdated(parcelUsd, _parcelUsd);
        parcelUsd = _parcelUsd;
    }
    function setGzeBonus(uint _gzeBonus) public onlyOwner {
        emit GzeBonusUpdated(gzeBonus, _gzeBonus);
        gzeBonus = _gzeBonus;
    }

    function symbol() public view returns (string _symbol) {
        _symbol = parcelToken.symbol();
    }
    function name() public view returns (string _name) {
        _name = parcelToken.name();
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
        // BK TODO: Owner check?
        require(token == address(gzeToken));
        uint _parcelGze;
        bool hasValue;
        (_parcelGze, hasValue) = parcelGze();
        require(hasValue);
        uint parcels = tokens.div(_parcelGze);
        require(parcels > 0);
        parcelsSold = parcelsSold.add(parcels);
        require(parcelsSold <= maxParcels);
        uint gzeToTransfer = parcels.mul(_parcelGze);
        contributedGze = contributedGze.add(gzeToTransfer);
        ERC20Interface(token).transferFrom(from, wallet, gzeToTransfer);
        parcelToken.mint(from, parcelUsd.mul(parcels), false);
        emit Contributed(msg.sender, parcels, gzeToTransfer, 0, parcelsSold, contributedGze, contributedEth);
    }
    function () public payable {
        require(now >= startDate && now <= endDate);
        // BK TODO: Owner check?
        uint _parcelEth;
        bool hasValue;
        (_parcelEth, hasValue) = parcelEth();
        require(hasValue);
        uint parcels = msg.value.div(_parcelEth);
        require(parcels > 0);
        parcelsSold = parcelsSold.add(parcels);
        require(parcelsSold <= maxParcels);
        uint ethToTransfer = parcels.mul(_parcelEth);
        contributedEth = contributedEth.add(ethToTransfer);
        uint ethToRefund = msg.value.sub(ethToTransfer);
        if (ethToRefund > 0) {
            msg.sender.transfer(ethToRefund);
        }
        parcelToken.mint(msg.sender, parcelUsd.mul(parcels), false);
        emit Contributed(msg.sender, parcels, 0, ethToTransfer, parcelsSold, contributedGze, contributedEth);
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
    //     parcelToken.mint(tokenOwner, gzeAmount, lockAccount);
    //     emit Contributed(tokenOwner, ethAmount, ethRefund, accountEthAmount[tokenOwner], usdAmount, gzeAmount, contributedEth, contributedUsd, generatedGze, lockAccount);
    // }
    function finalise() public onlyOwner {
        require(!finalised);
        require(now > endDate || parcelsSold >= maxParcels);
        parcelToken.disableMinting();
        finalised = true;
    }
}
