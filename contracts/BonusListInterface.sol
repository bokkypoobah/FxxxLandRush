pragma solidity ^0.4.25;

// ----------------------------------------------------------------------------
// Bonus List interface
// ----------------------------------------------------------------------------
contract BonusListInterface {
    function isInBonusList(address account) public view returns (bool);
}
