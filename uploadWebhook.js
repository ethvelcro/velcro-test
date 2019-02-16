var ipfsClient = require('ipfs-http-client')
var chalk = require('chalk')

module.exports = async function () {
  console.log(chalk.yellow(`Uploading webhook to IPFS...`))

  var ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' })

  var webhook = {
    url: "https://enessdesb4vmt.x.pipedream.net",
    query: {
      queryType: "EventQuery",
      address: "0xc1846137e6ca6d1380e153b68fe5d8966133807b",
      topics: []
    }
  }

  var blob = JSON.stringify(webhook)
  var buffer = Buffer.from(blob)
  const [ { path, hash, size } ] = await ipfs.add(buffer)

  console.log(chalk.green(`Uploaded file to IPFS with hash ${hash}`))

  return hash
}
