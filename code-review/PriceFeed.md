# PriceFeed

Source file [../contracts/PriceFeed.sol](../contracts/PriceFeed.sol).

<br />

<hr />

```solidity
// BK Ok
pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// BokkyPooBah's Pricefeed from a single source
//
// Deployed to: 0xD649c9b68BB78e8fd25c0B7a9c22c42f57768c91
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2018. The MIT Licence.
// ----------------------------------------------------------------------------

// BK Next 2 Ok
import "Operated.sol";
import "PriceFeedInterface.sol";


// ----------------------------------------------------------------------------
// Pricefeed from a single source
// ----------------------------------------------------------------------------
// BK Ok
contract PriceFeed is PriceFeedInterface, Operated {
    // BK Next 3 Ok
    string private _name;
    uint private _rate;
    bool private _live;

    // BK Ok - Event
    event SetRate(uint oldRate, bool oldLive, uint newRate, bool newLive);

    // BK Ok - Constructor
    constructor(string name, uint rate, bool live) public {
        // BK Ok - Initialisation called
        initOperated(msg.sender);
        // BK Next 3 Ok
        _name = name;
        _rate = rate;
        _live = live;
        // BK Ok - Log event
        emit SetRate(0, false, _rate, _live);
    }
    // BK Ok - View function
    function name() public view returns (string) {
        // BK Ok
        return _name;
    }
    // BK Ok - Only operator can execute
    function setRate(uint rate, bool live) public onlyOperator {
      // BK Ok - Log event
      emit SetRate(_rate, _live, rate, live);
        // BK Next 2 Ok
        _rate = rate;
        _live = live;
    }
    // BK Ok - View function, matches interface
    function getRate() public view returns (uint rate, bool live) {
        // BK Ok
        return (_rate, _live);
    }
}

```
