var HDWalletProvider = require("truffle-hdwallet-provider")
var Web3 = require('web3')

module.exports = function () {
  return new Web3(
    new Web3.providers.HttpProvider(process.env.HTTP_PROVIDER_URL)
    // new HDWalletProvider(
    //   process.env.HDWALLET_MNEMONIC,
    //   process.env.HTTP_PROVIDER_URL,
    //   0, // we start with address[0]
    //   8 // notice that we unlock eight: which will be address[0] and address[1]
    // )
  )
}
