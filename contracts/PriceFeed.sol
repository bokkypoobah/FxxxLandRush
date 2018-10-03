pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// BokkyPooBah's Pricefeed from a single source
//
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2018. The MIT Licence.
// ----------------------------------------------------------------------------

import "Operated.sol";


// ----------------------------------------------------------------------------
// Pricefeed from a single source
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
    function setRate(uint _rate, bool _live) public onlyOperator {
        rate = _rate;
        live = _live;
        emit SetRate(rate, live, _rate, _live);
    }
    function getRate() public view returns (uint _rate, bool _live) {
        return (rate, live);
    }
}
