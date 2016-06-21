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

# Example

Train:

```json
[{"id":"b503ced7.deaa","type":"debug","z":"5f229c05.6151c4","name":"","active":true,"console":"false","complete":"payload","x":690.9999847412109,"y":152.88888549804688,"wires":[]},{"id":"1bcaffdc.bb291","type":"inject","z":"5f229c05.6151c4","name":"","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":155,"y":200.88888549804688,"wires":[["f726b678.8370e8"]]},{"id":"f726b678.8370e8","type":"function","z":"5f229c05.6151c4","name":"fake data","func":"// This function return a fake json array\nvar trainData = [{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},\n           {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},\n           {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]\n\nmsg.trainData = trainData\nreturn msg;","outputs":1,"noerr":0,"x":294.99998474121094,"y":152.88888549804688,"wires":[["f0b9653f.3c7498"]]},{"id":"f0b9653f.3c7498","type":"neuralNetwork","z":"5f229c05.6151c4","name":"neuralNetwork","brainType":"train","learningRate":0.3,"hiddenLayers":"3,4","errorThresh":0.005,"iterations":20000,"logPeriod":10,"x":467.8332977294922,"y":211.72222900390625,"wires":[["b503ced7.deaa"]]}]
```

Run:

```json
[{"id":"5c1c3c96.016d54","type":"debug","z":"496f001a.0cd7f","name":"","active":true,"console":"false","complete":"payload","x":751.8957977294922,"y":143.88888549804688,"wires":[]},{"id":"aca8b7a.663d248","type":"inject","z":"496f001a.0cd7f","name":"","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":139.89581298828125,"y":188.88888549804688,"wires":[["f0c76f9e.fba9c"]]},{"id":"f0c76f9e.fba9c","type":"function","z":"496f001a.0cd7f","name":"fake data","func":"// This function return a fake json array\nvar netData = { \"layers\":[{\"r\":{},\"g\":{},\"b\":{}},{\"0\":{\"bias\":0.5976173927716023,\"weights\":{\"r\":3.5006895738532835,\"g\":-4.542455700505483,\"b\":0.9988932386815509}},\"1\":{\"bias\":0.6470978455858952,\"weights\":{\"r\":3.6115725201557827,\"g\":-4.875546614413311,\"b\":1.211740813346471}},\"2\":{\"bias\":-0.3559477465736521,\"weights\":{\"r\":1.1063595019849224,\"g\":-1.857026678772011,\"b\":0.14886809335684345}}},{\"black\":{\"bias\":3.3336645409591017,\"weights\":{\"0\":-3.7876606581596914,\"1\":-4.023316483216229,\"2\":-1.0819957068479935}},\"white\":{\"bias\":-3.29149645757729,\"weights\":{\"0\":3.782751737648757,\"1\":4.173873416865656,\"2\":0.7154074171638515}}}],\"outputLookup\":true,\"inputLookup\":true}    \nvar runData = { r: 1, g: 0.4, b: 0 }\n\nmsg.runData = runData\nmsg.netData = netData\nreturn msg;","outputs":1,"noerr":0,"x":333.89581298828125,"y":199.88888549804688,"wires":[["2727488d.6e6e48"]]},{"id":"2727488d.6e6e48","type":"neuralNetwork","z":"496f001a.0cd7f","name":"neuralNetwork","brainType":"run","learningRate":0.3,"hiddenLayers":"3","errorThresh":0.005,"iterations":20000,"logPeriod":10,"x":511.89576721191406,"y":184.88888549804688,"wires":[["5c1c3c96.016d54"]]}]
```


# License 

MIT License
\ No newline at end of file