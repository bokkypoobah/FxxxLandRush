# MakerDAOPriceFeedAdaptor

Source file [../contracts/MakerDAOPriceFeedAdaptor.sol](../contracts/MakerDAOPriceFeedAdaptor.sol).

<br />

<hr />

```solidity
// BK Ok
pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// Adaptor to convert MakerDAO's "pip" price feed into BokkyPooBah's Pricefeed
//
// Used to convert MakerDAO ETH/USD pricefeed on the Ethereum mainnet at
//   https://etherscan.io/address/0x729D19f657BD0614b4985Cf1D82531c67569197B
// to be a slightly more useable form
//
// Deployed to: 0x12bc52A5a9cF8c1FfBAA2eAA82b75B3E79DfE292
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2018. The MIT Licence.
// ----------------------------------------------------------------------------

// BK Ok
import "PriceFeedInterface.sol";


// ----------------------------------------------------------------------------
// See https://github.com/bokkypoobah/MakerDAOSaiContractAudit/tree/master/audit#pip-and-pep-price-feeds
// ----------------------------------------------------------------------------
// BK Ok
contract MakerDAOPriceFeedInterface {
    // BK Ok - Matches `function peek() constant returns (bytes32, bool)` from MakerDAO 0x729D...
    function peek() public view returns (bytes32 _value, bool _hasValue);
}


// ----------------------------------------------------------------------------
// Pricefeed with interface compatible with MakerDAO's "pip" PriceFeed
// ----------------------------------------------------------------------------
// BK Ok
contract MakerDAOPriceFeedAdaptor is PriceFeedInterface {
    // BK Ok
    MakerDAOPriceFeedInterface public makerDAOPriceFeed;

    // BK Ok - Constructor
    constructor(address _makerDAOPriceFeed) public {
        // BK Ok
        makerDAOPriceFeed = MakerDAOPriceFeedInterface(_makerDAOPriceFeed);
    }
    // BK Ok - View function, matches interface
    function getRate() public view returns (uint _rate, bool _live) {
        // BK Ok
        bytes32 value;
        // BK Ok
        (value, _live) = makerDAOPriceFeed.peek();
        // BK Ok
        _rate = uint(value);
    }
}

```
