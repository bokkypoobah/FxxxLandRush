pragma solidity ^0.4.24;

// ----------------------------------------------------------------------------
// BokkyPooBah's MakerDAO ETH/USD Pricefeed Simulator v1.00
//
// Simulates pricefeed on the Ethereum mainnet at
//   https://etherscan.io/address/0x729D19f657BD0614b4985Cf1D82531c67569197B
//
// https://github.com/bokkypoobah/BokkyPooBahsDerivatives
//
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2018.
//
// GNU Lesser General Public License 3.0
// https://www.gnu.org/licenses/lgpl-3.0.en.html
// ----------------------------------------------------------------------------

import "Owned.sol";


// ----------------------------------------------------------------------------
// MakerDAO ETH/USD PricefeedSimulator
// ----------------------------------------------------------------------------
contract MakerDAOETHUSDPricefeedSimulator is Owned {
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