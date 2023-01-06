import * as IPFS from 'ipfs-core'



async function main() {
  // Create an IPFS instance
  const ipfs = await IPFS.create()

  console.log("here")

  // Publish a message to the "boop" topic
  await ipfs.pubsub.publish('hjkhjkfdhsjafhjkdhjksajkhfdjhksajhk4242', Buffer.from('Hello, world!'))

  console.log("here2")
}

main()