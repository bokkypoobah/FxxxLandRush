pragma solidity ^0.4.24;

// ----------------------------------------------------------------------------
// MakerDAO "pip" Pricefeed Interface
// ----------------------------------------------------------------------------
contract MakerDAOPriceFeedInterface {
    function peek() public view returns (bytes32 _value, bool _hasValue);
}
