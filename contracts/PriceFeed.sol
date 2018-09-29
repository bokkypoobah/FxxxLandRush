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
    uint public value;
    bool public hasValue;

    event SetValue(uint value, bool hasValue);

    constructor(uint _value, bool _hasValue) public {
        initOwned(msg.sender);
        value = _value;
        hasValue = _hasValue;
        emit SetValue(value, hasValue);
    }
    function setValue(uint _value, bool _hasValue) public onlyOwner {
        value = _value;
        hasValue = _hasValue;
        emit SetValue(value, hasValue);
    }
    function peek() public view returns (bytes32 _value, bool _hasValue) {
        _value = bytes32(value);
        _hasValue = hasValue;
    }
}
