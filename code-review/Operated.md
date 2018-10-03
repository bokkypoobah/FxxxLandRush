# Operated

Source file [../contracts/Operated.sol](../contracts/Operated.sol).

<br />

<hr />

```solidity
// BK Ok
pragma solidity ^0.4.25;

// BK Ok
import "Owned.sol";


// ----------------------------------------------------------------------------
// Maintain a list of operators that are permissioned to execute certain
// functions
// ----------------------------------------------------------------------------
// BK Ok
contract Operated is Owned {
    // BK Ok
    mapping(address => bool) public operators;

    // BK Next 2 Ok - Events
    event OperatorAdded(address _operator);
    event OperatorRemoved(address _operator);

    // BK Ok - Modifier
    modifier onlyOperator() {
        // BK Ok
        require(operators[msg.sender] || owner == msg.sender);
        // BK Ok
        _;
    }

    // BK NOTE - Important for this function to be executed once for each contract
    // BK Ok - Internal function
    function initOperated(address _owner) internal {
        // BK Ok - initOwned can only be called once
        initOwned(_owner);
    }
    // BK Ok - Only owner can execute
    function addOperator(address _operator) public onlyOwner {
        // BK Ok
        require(!operators[_operator]);
        // BK Ok
        operators[_operator] = true;
        // BK Ok - Log event
        emit OperatorAdded(_operator);
    }
    // BK Ok - Only owner can execute
    function removeOperator(address _operator) public onlyOwner {
        // BK OK
        require(operators[_operator]);
        // BK Ok
        delete operators[_operator];
        // BK Ok - Log event
        emit OperatorRemoved(_operator);
    }
}

```
