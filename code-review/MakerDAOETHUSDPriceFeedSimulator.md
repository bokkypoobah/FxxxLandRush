# MakerDAOETHUSDPriceFeedSimulator

Source file [../contracts/MakerDAOETHUSDPriceFeedSimulator.sol](../contracts/MakerDAOETHUSDPriceFeedSimulator.sol).

<br />

<hr />

```solidity
// BK Ok - This is only for testing MakerDAO's 0x729D... contract on Mainnet
pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// BokkyPooBah's MakerDAO's "pip" PriceFeed Simulator for testing
//
// Used to simulate the MakerDAO ETH/USD pricefeed on the Ethereum mainnet at
//   https://etherscan.io/address/0x729D19f657BD0614b4985Cf1D82531c67569197B
//
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2018. The MIT Licence.
// ----------------------------------------------------------------------------

// BK Ok
import "Owned.sol";


// ----------------------------------------------------------------------------
// Pricefeed with interface compatible with MakerDAO's "pip" PriceFeed
// ----------------------------------------------------------------------------
// BK Ok
contract MakerDAOETHUSDPriceFeedSimulator is Owned {
    // BK Next 2 Ok
    uint public value;
    bool public hasValue;

    // BK Ok - Event
    event SetValue(uint oldValue, bool oldHasValue, uint newValue, bool newHasValue);

    // BK Ok - Constructor
    constructor(uint _value, bool _hasValue) public {
        // BK Ok - Initisalisation done
        initOwned(msg.sender);
        // BK Next 2 Ok
        value = _value;
        hasValue = _hasValue;
        // BK Ok - Log event
        emit SetValue(0, false, value, hasValue);
    }
    // BK Ok - Only owner can execute
    function setValue(uint _value, bool _hasValue) public onlyOwner {
        // BK Ok - Log event
        emit SetValue(value, hasValue, _value, _hasValue);
        // BK Next 2 Ok
        value = _value;
        hasValue = _hasValue;
    }
    // BK Ok - View function, matches `function peek() constant returns (bytes32, bool)` from MakerDAO 0x729D...
    function peek() public view returns (bytes32 _value, bool _hasValue) {
        // BK Next 2 Ok
        _value = bytes32(value);
        _hasValue = hasValue;
    }
}

```
