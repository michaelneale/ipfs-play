// sub.mjs
import * as IPFS from 'ipfs-core'
import os from 'os'
import path from 'path'
import { TOPIC } from './constants.mjs'

async function main() {
  // Create an IPFS instance
  const ipfs = await IPFS.create({
    // create a repo just for the subscriber node
    repo: path.join(os.tmpdir(), `sub-${Date.now()}`),
    config: {
      Addresses: {
        Swarm: [
          // listen on a random tcp port
          '/ip4/0.0.0.0/tcp/0'
        ]
      }
    }
  })

  console.log("OK connected to IPFS")

  // Subscribe to the "boop" topic
  ipfs.pubsub.subscribe(TOPIC, (msg) => {
    console.log(`Received message: ${msg.data.toString()}`)
    ipfs.pubsub.publish("woot", Buffer.from('Hello, world to you!'))
  })

  console.log("OK subscribed to topic")

}

main()