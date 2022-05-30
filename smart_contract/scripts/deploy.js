const main = async () => {

  // factory pattern for generating functions
  const TransactionsFactory = await hre.ethers.getContractFactory("Bank");
  const transactionsContract = await TransactionsFactory.deploy();

  await transactionsContract.deployed();

  console.log("Transactions address:", transactionsContract.address);
}


const runMain = async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();