// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract Counter {
    uint256 value;

    event Increment(uint256 value);
    event Decrement(uint256 value);

    function increment() public {
        value++;
        emit Increment(value);
    }

    function decrement() public {
        value--;
        emit Decrement(value);
    }

    function getValue() public view returns (uint256) {
        return value;
    }
}