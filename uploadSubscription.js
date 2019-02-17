var ipfsClient = require('ipfs-http-client')
var chalk = require('chalk')

module.exports = async function () {
  console.log(chalk.yellow(`Uploading subscription to IPFS...`))

  var ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' })
  const websocketUri = "wss://api.thegraph.com/subgraphs/name/graphprotocol/decentraland"

  var webhook = {
    url: "https://eniipbp6x9vi.x.pipedream.net",
    query: {
      queryType: "GraphQuery",
      websocketUri,
      subscriptionQuery: `
        subscription decentraland {
          parcels {
            id
          }
        }
      `
    }
  }

  var blob = JSON.stringify(webhook)
  var buffer = Buffer.from(blob)
  const [ { path, hash, size } ] = await ipfs.add(buffer)

  console.log(chalk.green(`Uploaded file to IPFS with hash ${hash}`))

  return hash
}
