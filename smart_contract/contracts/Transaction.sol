// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract Transaction {
    uint256 private value;
    uint256 private bankAddress;

    event Transfer(uint256 value);
    event Decrement(uint256 value);

    function transfer(address sender, address receiver, uint256 money) public {
        return;
    }

    function getValue() public view returns (uint256) {
        return value;
    }

    function decrement() public {
        value--;
        emit Decrement(value);
    }
}