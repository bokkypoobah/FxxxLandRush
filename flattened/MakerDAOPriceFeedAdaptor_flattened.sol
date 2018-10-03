pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// Adaptor to convert MakerDAO's "pip" price feed into BokkyPooBah's Pricefeed
//
// Used to convert MakerDAO ETH/USD pricefeed on the Ethereum mainnet at
//   https://etherscan.io/address/0x729D19f657BD0614b4985Cf1D82531c67569197B
// to be a slightly more useable form
//
// Deployed to:
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2018. The MIT Licence.
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// PriceFeed Interface
// ----------------------------------------------------------------------------
contract PriceFeedInterface {
    function getRate() public view returns (uint _rate, bool _live);
}


// ----------------------------------------------------------------------------
// See https://github.com/bokkypoobah/MakerDAOSaiContractAudit/tree/master/audit#pip-and-pep-price-feeds
// ----------------------------------------------------------------------------
contract MakerDAOPriceFeedInterface {
    function peek() public view returns (bytes32 _value, bool _hasValue);
}


// ----------------------------------------------------------------------------
// Pricefeed with interface compatible with MakerDAO's "pip" PriceFeed
// ----------------------------------------------------------------------------
contract MakerDAOPriceFeedAdaptor is PriceFeedInterface {
    MakerDAOPriceFeedInterface public makerDAOPriceFeed;

    constructor(address _makerDAOPriceFeed) public {
        makerDAOPriceFeed = MakerDAOPriceFeedInterface(_makerDAOPriceFeed);
    }
    function getRate() public view returns (uint _rate, bool _live) {
        bytes32 value;
        (value, _live) = makerDAOPriceFeed.peek();
        _rate = uint(value);
    }
}
