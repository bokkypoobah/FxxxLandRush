# Owned

Source file [../contracts/Owned.sol](../contracts/Owned.sol).

<br />

<hr />

```solidity
// BK Ok
pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// Owned contract
// ----------------------------------------------------------------------------
// BK Ok
contract Owned {
    // BK Ok
    address public owner;
    // BK Ok
    address public newOwner;
    // BK Ok
    bool private initialised;

    // BK Ok - Event
    event OwnershipTransferred(address indexed _from, address indexed _to);

    // BK Ok - Modifier
    modifier onlyOwner {
        // BK Ok
        require(msg.sender == owner);
        // BK Ok
        _;
    }

    // BK NOTE - Important for this function to be executed once for each contract
    // BK Ok - Internal function, must only be called once
    function initOwned(address _owner) internal {
        // BK Ok
        require(!initialised);
        // BK Ok
        owner = _owner;
        // BK Ok
        initialised = true;
    }
    // BK Ok - Only owner can execute
    function transferOwnership(address _newOwner) public onlyOwner {
        // BK Ok
        newOwner = _newOwner;
    }
    // BK Ok - Only new owner can execute
    function acceptOwnership() public {
        // BK Ok
        require(msg.sender == newOwner);
        // BK Ok - Log event
        emit OwnershipTransferred(owner, newOwner);
        // BK Ok
        owner = newOwner;
        // BK Ok
        newOwner = address(0);
    }
    //  BK Ok - Only owner can execute
    function transferOwnershipImmediately(address _newOwner) public onlyOwner {
        // BK Ok - Log event
        emit OwnershipTransferred(owner, _newOwner);
        // BK Ok
        owner = _newOwner;
    }
}

```
