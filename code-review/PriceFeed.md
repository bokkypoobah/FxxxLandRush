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
// Deployed to: 0x4604646C55410EAa6Cf43b04d26071E36bC227Ef
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
    string public name;
    uint public rate;
    bool public live;

    // BK Ok - Event
    event SetRate(uint oldRate, bool oldLive, uint newRate, bool newLive);

    // BK Ok - Constructor
    constructor(string _name, uint _rate, bool _live) public {
        // BK Ok - Initialisation called
        initOperated(msg.sender);
        // BK Next 3 Ok
        name = _name;
        rate = _rate;
        live = _live;
        // BK Ok - Log event
        emit SetRate(0, false, rate, live);
    }
    // BK Ok - Only operator can execute
    function setRate(uint _rate, bool _live) public onlyOperator {
      // BK Ok - Log event
      emit SetRate(rate, live, _rate, _live);
        // BK Next 2 Ok
        rate = _rate;
        live = _live;
    }
    // BK Ok - View function, matches interface
    function getRate() public view returns (uint _rate, bool _live) {
        // BK Ok
        return (rate, live);
    }
}

```
