pragma solidity ^0.4.24;

// ----------------------------------------------------------------------------
// BokkyPooBah's Pricefeed compatible with MakerDAO's "pip" PriceFeed
//
// Used to simulate the MakerDAO ETH/USD pricefeed on the Ethereum mainnet at
//   https://etherscan.io/address/0x729D19f657BD0614b4985Cf1D82531c67569197B
// Used as a manual feed for GZE/ETH
//
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2018. The MIT Licence.
// ----------------------------------------------------------------------------

import "Operated.sol";


// ----------------------------------------------------------------------------
// Pricefeed with interface compatible with MakerDAO's "pip" PriceFeed
// ----------------------------------------------------------------------------
contract PriceFeed is Operated {
    uint public rate;
    bool public live;

    event SetRate(uint oldRate, bool oldLive, uint newRate, bool newLive);

    constructor(uint _rate, bool _live) public {
        initOperated(msg.sender);
        rate = _rate;
        live = _live;
        emit SetRate(0, false, rate, live);
    }
    function setValue(uint _rate, bool _live) public onlyOperator {
        emit SetRate(rate, live, _rate, _live);
        rate = _rate;
        live = _live;
    }
    function getRate() public view returns (uint _rate, bool _live) {
        return (rate, live);
    }
}
