# PriceFeedInterface

Source file [../contracts/PriceFeedInterface.sol](../contracts/PriceFeedInterface.sol).

<br />

<hr />

```solidity
// BK Ok
pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// PriceFeed Interface - _live is true if the rate is valid, false if invalid
// ----------------------------------------------------------------------------
// BK Ok
contract PriceFeedInterface {
    // BK Ok - View function interface
    function getRate() public view returns (uint _rate, bool _live);
}

```
