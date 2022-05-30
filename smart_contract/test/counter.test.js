// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Counter", function () {
//   it("Should display current value", async function () {
//     const Counter = await ethers.getContractFactory("Counter");
//     const counter = await Counter.deploy();
//     await counter.deployed();

//     expect(await counter.getValue()).to.equal("0");
//   });

//   it("Should increment value", async function () {
//     const Counter = await ethers.getContractFactory("Counter");
//     const counter = await Counter.deploy();
//     await counter.deployed();

//     await counter.increment();

//     expect(await counter.getValue()).to.equal("1");
//   });

//   it("Should decrement value", async function () {
//     const Counter = await ethers.getContractFactory("Counter");
//     const counter = await Counter.deploy();
//     await counter.deployed();

//     await counter.increment();
//     await counter.decrement();

//     expect(await counter.getValue()).to.equal("0");
//   });
// });
