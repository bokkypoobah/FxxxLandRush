# BonusList

Source file [../contracts/BonusList.sol](../contracts/BonusList.sol).

<br />

<hr />

```solidity
// BK Ok
pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// GazeCoin FxxxLandRush Bonus List
//
// Enjoy.
//
// (c) BokkyPooBah / Bok Consulting Pty Ltd for GazeCoin 2018. The MIT Licence.
// ----------------------------------------------------------------------------

// BK Next 2 Ok
import "Operated.sol";
import "BonusListInterface.sol";


// ----------------------------------------------------------------------------
// Bonus List - on list or not
// ----------------------------------------------------------------------------
// BK Ok
contract BonusList is BonusListInterface, Operated {
    // BK Ok
    mapping(address => bool) public bonusList;

    // BK Ok - Event
    event AccountListed(address indexed account, bool status);

    // BK Ok - Constructor - calls initialisation code
    constructor() public {
        // BK Ok
        initOperated(msg.sender);
    }

    // BK Ok - View function, matches interface
    function isInBonusList(address account) public view returns (bool) {
        // BK Ok
        return bonusList[account];
    }

    // BK Ok - Only operator can execute
    function add(address[] accounts) public onlyOperator {
        // BK Ok
        require(accounts.length != 0);
        // BK Ok
        for (uint i = 0; i < accounts.length; i++) {
            // BK Ok
            require(accounts[i] != address(0));
            // BK Ok
            if (!bonusList[accounts[i]]) {
                // BK Ok
                bonusList[accounts[i]] = true;
                // BK Ok - Log event
                emit AccountListed(accounts[i], true);
            }
        }
    }
    // BK Ok - Only operator can execute
    function remove(address[] accounts) public onlyOperator {
        // BK Ok
        require(accounts.length != 0);
        // BK Ok
        for (uint i = 0; i < accounts.length; i++) {
            // BK Ok
            require(accounts[i] != address(0));
            // BK Ok
            if (bonusList[accounts[i]]) {
                // BK Ok
                delete bonusList[accounts[i]];
                // BK Ok - Log event
                emit AccountListed(accounts[i], false);
            }
        }
    }
}

```
