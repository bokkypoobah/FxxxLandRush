pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// PriceFeed Interface
// ----------------------------------------------------------------------------
contract PriceFeedInterface {
    function getRate() public view returns (uint _rate, bool _live);
}
