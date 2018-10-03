pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// PriceFeed Interface - _live is true if the rate is valid, false if invalid
// ----------------------------------------------------------------------------
contract PriceFeedInterface {
    function getRate() public view returns (uint _rate, bool _live);
}
