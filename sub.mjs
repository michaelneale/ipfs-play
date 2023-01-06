import * as IPFS from 'ipfs-core'

async function main() {
  // Create an IPFS instance
  const ipfs = await IPFS.create()

  // Subscribe to the "boop" topic
  ipfs.pubsub.subscribe('hjkhjkfdhsjafhjkdhjksajkhfdjhksajhk4242', (msg) => {
    console.log(`Received message: ${msg.data.toString()}`)
  })
}

main()