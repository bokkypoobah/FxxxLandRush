pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// GazeCoin FxxxLandRush Bonus List
//
// Deployed to: 0x57D2F4B8F55A26DfE8Aba3c9f1c73CADbBc55C46
//
// Enjoy.
//
// (c) BokkyPooBah / Bok Consulting Pty Ltd for GazeCoin 2018. The MIT Licence.
// ----------------------------------------------------------------------------

import "Operated.sol";
import "BonusListInterface.sol";


// ----------------------------------------------------------------------------
// Bonus List - on list or not
// ----------------------------------------------------------------------------
contract BonusList is BonusListInterface, Operated {
    mapping(address => bool) public bonusList;

    event AccountListed(address indexed account, bool status);

    constructor() public {
        initOperated(msg.sender);
    }

    function isInBonusList(address account) public view returns (bool) {
        return bonusList[account];
    }

    function add(address[] accounts) public onlyOperator {
        require(accounts.length != 0);
        for (uint i = 0; i < accounts.length; i++) {
            require(accounts[i] != address(0));
            if (!bonusList[accounts[i]]) {
                bonusList[accounts[i]] = true;
                emit AccountListed(accounts[i], true);
            }
        }
    }
    function remove(address[] accounts) public onlyOperator {
        require(accounts.length != 0);
        for (uint i = 0; i < accounts.length; i++) {
            require(accounts[i] != address(0));
            if (bonusList[accounts[i]]) {
                delete bonusList[accounts[i]];
                emit AccountListed(accounts[i], false);
            }
        }
    }
}
