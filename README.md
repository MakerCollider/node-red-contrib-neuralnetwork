# node-red-contrib-neuralnetwork


# Install

```bash

Download node-red-contrib-neuralnetwork to nodered root directory. 
Windows for example: C:\node-red\node_modules
Linux for example: /home/root/node-red/node_modules

```

**You will need to restart Node-RED for it to pick-up the new nodes.**

# Usage

node-red-contrib-neuralnetwork is based on [brain](https://github.com/harthur/brain). You need to see it basic usage at first.

## Train

When there is no `msg.netJSON` input, `brain` node will train with `msg.trainData` and output `net.toJSON` in `msg.net`.

## Run

When there is `msg.netJSON` input, `brain` node will not train anymore. Instead, it will directory run `net.run()` with your `msg.runData`. And output the result in `msg.payload`.

## Options

You could pass a `msg.neuralNetworkOptions` to brain node. See [brain options doc](https://github.com/harthur/brain/#options-1).

# Example

Train:

```json
[{"id":"d4a484b.f2b5b78","type":"debug","z":"46d50fa1.b92af","name":"","active":true,"console":"false","complete":"net","x":679,"y":175,"wires":[]},{"id":"3b4d60b3.c4b2a","type":"inject","z":"46d50fa1.b92af","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":150,"y":144,"wires":[["6d766489.92899c"]]},{"id":"6d766489.92899c","type":"function","z":"46d50fa1.b92af","name":"fake data","func":"// This function return a fake json array\nvar trainData = [{input: { r: 0...(line truncated)...
```

Run:

```json
[{"id":"10d56f1d.ef2a91","type":"debug","z":"46d50fa1.b92af","name":"","active":true,"console":"false","complete":"payload","x":687,"y":346,"wires":[]},{"id":"808a1160.7f75f","type":"inject","z":"46d50fa1.b92af","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":131,"y":325,"wires":[["fbed5f0e.0412a"]]},{"id":"fbed5f0e.0412a","type":"function","z":"46d50fa1.b92af","name":"fake data","func":"// This function return a fake json array\nvar netJSON = {\"layers\":[{\...(line truncated)...
```


# License 

MIT License
\ No newline at end of file