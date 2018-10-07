pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// BokkyPooBah's Pricefeed from a single source
//
// Deployed to: 0xD649c9b68BB78e8fd25c0B7a9c22c42f57768c91
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2018. The MIT Licence.
// ----------------------------------------------------------------------------

import "Operated.sol";
import "PriceFeedInterface.sol";


// ----------------------------------------------------------------------------
// Pricefeed from a single source
// ----------------------------------------------------------------------------
contract PriceFeed is PriceFeedInterface, Operated {
    string private _name;
    uint private _rate;
    bool private _live;

    event SetRate(uint oldRate, bool oldLive, uint newRate, bool newLive);

    constructor(string name, uint rate, bool live) public {
        initOperated(msg.sender);
        _name = name;
        _rate = rate;
        _live = live;
        emit SetRate(0, false, _rate, _live);
    }
    function name() public view returns (string) {
        return _name;
    }
    function setRate(uint rate, bool live) public onlyOperator {
        emit SetRate(_rate, _live, rate, live);
        _rate = rate;
        _live = live;
    }
    function getRate() public view returns (uint rate, bool live) {
        return (_rate, _live);
    }
}
