// pub.mjs
import * as IPFS from 'ipfs-core'
import os from 'os'
import path from 'path'
import { TOPIC } from './constants.mjs'

async function main() {
  // Create an IPFS instance
  const ipfs = await IPFS.create({
    // create a repo just for the publisher node
    repo: path.join(os.tmpdir(), `pub-${Date.now()}`),
    config: {
      Addresses: {
        Swarm: [
          // listen on a random tcp port
          '/ip4/0.0.0.0/tcp/0'
        ]
      }
    }
  })

  // wait for topic peers
  while (true) {
    const peers = await ipfs.pubsub.peers(TOPIC)

    if (peers.length) {
      // there are some peers interested in this topic
      console.log("found topic peers")
      break
    }

    // wait a second to see if some topic peers are found
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  // Publish a message to the "boop" topic
  await ipfs.pubsub.publish(TOPIC, Buffer.from('Hello, world!'))

  console.log("published message to topic")
}

main()