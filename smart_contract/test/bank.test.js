const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bank", function () {
  let bank;

  // deploy the contract
  beforeEach(async () => {
    const Bank = await ethers.getContractFactory("Bank");
    bank = await Bank.deploy();
    await bank.deployed();
  });

  it("Should display balance", async function () {
    // Get the signer
    expect(await bank.getBalance()).to.equal("0");
  });

  it("Should deposit", async function () {
    // Get the signer
    const [sender] = await ethers.getSigners();
    await bank.deposit({value: ethers.utils.parseEther("1")});
    await bank.deposit({value: ethers.utils.parseEther("2")});
    expect(await bank.getBalance()).to.equal(ethers.utils.parseEther("3"));
  });

  it("Should withdraw", async function () {
    // Get the signer
    await bank.deposit({value: ethers.utils.parseEther("3")});
    await bank.withdraw(ethers.utils.parseEther("1"));
    expect(await bank.getBalance()).to.equal(ethers.utils.parseEther("2"));
  });

  it("Should loan", async function () {
    // Get the signer
    await bank.deposit({value: ethers.utils.parseEther("3")});
    // expect bank loan to succeed
    await bank.loan(ethers.utils.parseEther("1"));
    expect(await bank.getBalance()).to.equal(ethers.utils.parseEther("2"));
  });

  it("Should not loan more than 5x the balance in bank", async function () {
    // Get the signer
    await bank.deposit({value: ethers.utils.parseEther("1")});
    // expect bank loan to succeed
    expect(await bank.loan(ethers.utils.parseEther("6")))
    expect(await bank.getBalance()).to.equal(ethers.utils.parseEther("2"));
  });

  it("Should not withdraw more than available", async function () {
    // Get the signer
    await bank.deposit({value: ethers.utils.parseEther("1")});
    expect(await bank.withdraw(ethers.utils.parseEther("2")))
      .to.be.revertedWith("Not enough balance");
  });

});
