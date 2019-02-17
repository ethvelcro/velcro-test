var velcroArtifact = require('velcro-contracts/build/contracts/Velcro.json')
var newWeb3 = require('./newWeb3')
var chalk = require('chalk')
var uploadSubscription = require('./uploadSubscription')

async function subscribe () {
  const hash = await uploadSubscription()
  // const hash = "QmWj4XX6pWEtMxyMUjJ2xHhALZ6ESnteSa32cSGVjbx3kn"

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

  const tx = await velcro.methods.registerWebhook(hex).send({
    from: owner
  })

  console.log(chalk.green(`TxResult: ${tx.txHash}`), tx)
}

subscribe()
  .then(() => {
    console.log(chalk.green('Complete!'))
    process.exit(0)
  })
  .catch(error => {
    console.error(chalk.red('ERROR!'), error)
    process.exit(1)
  })
