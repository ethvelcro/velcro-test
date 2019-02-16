var velcroArtifact = require('velcro-contracts/build/contracts/Velcro.json')
var newWeb3 = require('./newWeb3')
var chalk = require('chalk')
var uploadWebhook = require('./uploadWebhook')

async function register () {
  const oldHash = 'QmbXw1QSQSM3GUYqqFxUbLX5aSrH2aa3dpcqUgiKMQ953B'
  const hash = await uploadWebhook()

  const web3 = newWeb3()
  const accounts = await web3.eth.getAccounts()
  const [ owner ] = accounts

  const velcro = new web3.eth.Contract(velcroArtifact.abi, process.env.CONTRACT_ADDRESS)
  const hex = web3.utils.toHex(hash)

  const hashOwner = await velcro.methods.owner(hex).call()
  if (hashOwner !== '0x0000000000000000000000000000000000000000') {
    await velcro.methods.unregisterWebhook(hex).send({
      from: owner
    })
  }

  const tx = await velcro.methods.registerWebhook(hex).send({ from: owner })
  console.log(chalk.green(`TxResult: ${tx.txHash}`), tx)
}

register()
  .then(() => {
    console.log(chalk.green('Complete!'))
    process.exit(0)
  })
  .catch(error => {
    console.error(chalk.red('ERROR!'), error)
    process.exit(1)
  })
