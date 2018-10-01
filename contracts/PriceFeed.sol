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

import "Owned.sol";


// ----------------------------------------------------------------------------
// Pricefeed with interface compatible with MakerDAO's "pip" PriceFeed
// ----------------------------------------------------------------------------
contract PriceFeed is Owned {
    mapping(address => bool) updaters;

    uint public value;
    bool public hasValue;

    event UpdaterSet(address indexed updater, bool status);
    event SetValue(uint oldValue, bool oldHasValue, uint newValue, bool newHasValue);

    modifier onlyUpdater {
        require(msg.sender == owner || updaters[msg.sender]);
        _;
    }

    constructor(uint _value, bool _hasValue) public {
        initOwned(msg.sender);
        value = _value;
        hasValue = _hasValue;
        emit SetValue(0, false, value, hasValue);
    }
    function setUpdater(address updater, bool status) public onlyOwner {
        updaters[updater] = status;
        emit UpdaterSet(updater, status);
    }
    function setValue(uint _value, bool _hasValue) public onlyUpdater {
        emit SetValue(value, hasValue, _value, _hasValue);
        value = _value;
        hasValue = _hasValue;
    }
    function peek() public view returns (bytes32 _value, bool _hasValue) {
        _value = bytes32(value);
        _hasValue = hasValue;
    }
}
