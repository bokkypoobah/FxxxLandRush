pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// BokkyPooBah's Pricefeed from a single source
//
// Deployed to: 0x695Bd54a75FA8e28183F9aF30063AD444ca0EBFc
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2018. The MIT Licence.
// ----------------------------------------------------------------------------

import "Operated.sol";
import "PriceFeedInterface.sol";


// ----------------------------------------------------------------------------
// Pricefeed from a single source
// ----------------------------------------------------------------------------
contract PriceFeed is PriceFeedInterface, Operated {
    string public name;
    uint public rate;
    bool public live;

    event SetRate(uint oldRate, bool oldLive, uint newRate, bool newLive);

    constructor(string _name, uint _rate, bool _live) public {
        initOperated(msg.sender);
        name = _name;
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
