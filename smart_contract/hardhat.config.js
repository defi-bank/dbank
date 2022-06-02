// https://eth-ropsten.alchemyapi.io/v2/gyHL8wotZpe1GOj2MBRldeHj4uD6_J3Q

require("dotenv").config()
require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: process.env.TESTNET_URL_GOERLI,
      accounts: [
        process.env.PRIVATE_KEY_METAMASK_WALLET
      ]
    },
    ropsten: {
      url: process.env.TESTNET_URL_ROPSTEN,
      accounts: [
        process.env.PRIVATE_KEY_METAMASK_WALLET
      ]
    },
    localhost: {
      url: process.env.TESTNET_URL_LOCALHOST,
      accounts: [
        process.env.PRIVATE_KEY_LOCALHOST_WALLET_1,
        process.env.PRIVATE_KEY_LOCALHOST_WALLET_2,
        process.env.PRIVATE_KEY_LOCALHOST_WALLET_3
      ]
    },
  }
}