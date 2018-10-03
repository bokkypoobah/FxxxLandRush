# SafeMath

Source file [../contracts/SafeMath.sol](../contracts/SafeMath.sol).

<br />

<hr />

```solidity
// BK Ok
pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// Safe maths
// ----------------------------------------------------------------------------
// BK Ok
library SafeMath {
    // BK Ok - Internal pure function
    function add(uint a, uint b) internal pure returns (uint c) {
        // BK Ok
        c = a + b;
        // BK Ok
        require(c >= a);
    }
    // BK Ok - Internal pure function
    function sub(uint a, uint b) internal pure returns (uint c) {
        // BK Ok
        require(b <= a);
        // BK Ok
        c = a - b;
    }
    // BK Ok - Internal pure function
    function mul(uint a, uint b) internal pure returns (uint c) {
        // BK Ok
        c = a * b;
        // BK Ok
        require(a == 0 || c / a == b);
    }
    // BK Ok - Internal pure function
    function div(uint a, uint b) internal pure returns (uint c) {
        // BK Ok
        require(b > 0);
        // BK Ok
        c = a / b;
    }
    // BK Ok - Internal pure function
    function max(uint a, uint b) internal pure returns (uint c) {
        // BK Ok
        c = a >= b ? a : b;
    }
    // BK Ok - Internal pure function
    function min(uint a, uint b) internal pure returns (uint c) {
        // BK Ok
        c = a <= b ? a : b;
    }
}

```
