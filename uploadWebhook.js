var ipfsClient = require('ipfs-http-client')
var chalk = require('chalk')

module.exports = async function () {
  console.log(chalk.yellow(`Uploading webhook to IPFS...`))

  var ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' })

  var webhook = {
    url: "https://eniipbp6x9vi.x.pipedream.net",
    query: {
      queryType: "EventQuery",
      address: "0xff67881f8d12f372d91baae9752eb3631ff0ed00",
      topics: []
    }
  }

  var blob = JSON.stringify(webhook)
  var buffer = Buffer.from(blob)
  const [ { path, hash, size } ] = await ipfs.add(buffer)

  console.log(chalk.green(`Uploaded file to IPFS with hash ${hash}`))

  return hash
}
