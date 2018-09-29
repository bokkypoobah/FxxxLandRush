pragma solidity ^0.4.24;

// ----------------------------------------------------------------------------
// Pricefeed Interface compatible with MakerDAO's "pip" PriceFeed
// ----------------------------------------------------------------------------
contract PriceFeedInterface {
    function peek() public view returns (bytes32 _value, bool _hasValue);
}
