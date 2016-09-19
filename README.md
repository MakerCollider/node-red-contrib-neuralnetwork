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

When there is no `msg.netData` input, `brain` node will train with `msg.trainData` and output `net.toJSON` in `msg.payload`.

## Run

When there is `msg.netData` input, `brain` node will not train anymore. Instead, it will directory run `net.run()` with your `msg.runData`. And output the result in `msg.payload`.

# Example

## Train:
Function

```json
[{"id":"6d112581.43402c","type":"function","z":"26aeea98.1c26c6","name":"traindata","func":"// This function return a fake json array\nvar trainData = [{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},\n           {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},\n           {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}];\n\nmsg.trainData = trainData;\nreturn msg;","outputs":1,"noerr":0,"x":302.9999694824219,"y":181,"wires":[["5a30af81.c25fa"]]},{"id":"531e2e82.c8824","type":"inject","z":"26aeea98.1c26c6","name":"train","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":162,"y":182,"wires":[["6d112581.43402c"]]},{"id":"5a30af81.c25fa","type":"neuralNetwork","z":"26aeea98.1c26c6","name":"neuralNetwork","brainType":"train","usageMode":"0","inputKey":"","outputKey":"","learningRate":0.3,"hiddenLayers":"3,4","errorThresh":0.005,"iterations":20000,"logPeriod":10,"x":504.8332824707031,"y":177.83334350585938,"wires":[["232cdbae.afd9a4"]]},{"id":"232cdbae.afd9a4","type":"debug","z":"26aeea98.1c26c6","name":"","active":true,"console":"false","complete":"payload","x":706.9999694824219,"y":174,"wires":[]}]
```
File

```json
[{"id":"4173989.58bab68","type":"file","z":"26aeea98.1c26c6","name":"","filename":"netdata","appendNewline":true,"createDir":true,"overwriteFile":"true","x":651.8402557373047,"y":206,"wires":[]},{"id":"32f18774.5c3798","type":"neuralNetwork","z":"26aeea98.1c26c6","name":"neuralNetwork","brainType":"train","usageMode":"0","inputKey":"","outputKey":"","learningRate":0.3,"hiddenLayers":"3,4","errorThresh":0.005,"iterations":20000,"logPeriod":10,"x":429.8332977294922,"y":208.75692749023438,"wires":[["4173989.58bab68"]]},{"id":"31471bef.b82ce4","type":"function","z":"26aeea98.1c26c6","name":"traindata","func":"// This function return a fake json array\nvar trainData = [{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},\n           {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},\n           {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}];\n\nmsg.trainData = trainData;\nreturn msg;","outputs":1,"noerr":0,"x":236.99993896484375,"y":213.923583984375,"wires":[["32f18774.5c3798"]]},{"id":"915c04.ab20d4","type":"inject","z":"26aeea98.1c26c6","name":"train","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":85,"y":219.923583984375,"wires":[["31471bef.b82ce4"]]}]
```

## Run:
Function

```json
[{"id":"b45b3043.11e3a","type":"neuralNetwork","z":"26aeea98.1c26c6","name":"neuralNetwork","brainType":"run","usageMode":"0","inputKey":"","outputKey":"","learningRate":0.3,"hiddenLayers":"3,4","errorThresh":0.005,"iterations":20000,"logPeriod":10,"x":529.9999084472656,"y":190,"wires":[["b50ef4fb.ca4298"]]},{"id":"80c6fd9e.b4f21","type":"function","z":"26aeea98.1c26c6","name":"rundata & netdata","func":"// This function return a fake json array\nvar netData = {\"layers\":[{\"b\":{},\"g\":{},\"r\":{}},{\"0\":{\"bias\":-0.9607698911892122,\"weights\":{\"b\":-0.8241525249603725,\"g\":3.537892108679892,\"r\":-2.716488101274963}},\"1\":{\"bias\":-1.1516024332750348,\"weights\":{\"b\":-1.0126001075152462,\"g\":4.353715735686107,\"r\":-3.2233345935870257}},\"2\":{\"bias\":0.4888619188275802,\"weights\":{\"b\":0.41953281378406115,\"g\":-0.9601032184316537,\"r\":0.7482923208072509}}},{\"0\":{\"bias\":1.3094754653086798,\"weights\":{\"0\":-2.600636916847057,\"1\":-3.396884376808377,\"2\":1.487054322123148}},\"1\":{\"bias\":0.5312262343955613,\"weights\":{\"0\":-1.9723085220356809,\"1\":-2.1034572097575244,\"2\":0.7000633911919903}},\"2\":{\"bias\":1.0872088028804758,\"weights\":{\"0\":-2.276035491011995,\"1\":-2.9679744880891796,\"2\":1.1001576381403693}},\"3\":{\"bias\":0.15821536225567093,\"weights\":{\"0\":-1.4435204625392943,\"1\":-2.09799352420935,\"2\":0.658272707668071}}},{\"white\":{\"bias\":-2.9740426876751234,\"weights\":{\"0\":3.0932096393643187,\"1\":1.7436477393563405,\"2\":2.7758308414721604,\"3\":1.5272730436751654}},\"black\":{\"bias\":3.005161280623962,\"weights\":{\"0\":-3.2448772390674048,\"1\":-1.9132040734678886,\"2\":-2.4921726882588526,\"3\":-1.6120206348469082}}}],\"outputLookup\":true,\"inputLookup\":true};\nvar runData = { r: 1, g: 0.4, b: 0 };\n\nmsg.runData = runData;\nmsg.netData = netData;\nreturn msg;","outputs":1,"noerr":0,"x":307.9999542236328,"y":191,"wires":[["b45b3043.11e3a"]]},{"id":"b34e7c3d.fd73d","type":"inject","z":"26aeea98.1c26c6","name":"run","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":133,"y":192,"wires":[["80c6fd9e.b4f21"]]},{"id":"b50ef4fb.ca4298","type":"debug","z":"26aeea98.1c26c6","name":"","active":true,"console":"false","complete":"payload","x":721.9999694824219,"y":194,"wires":[]}]
```
File

```json
[{"id":"f3d82851.fa5c38","type":"debug","z":"26aeea98.1c26c6","name":"","active":true,"console":"false","complete":"payload","x":788,"y":176,"wires":[]},{"id":"7bd3e797.d66848","type":"inject","z":"26aeea98.1c26c6","name":"run","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":130,"y":156,"wires":[["779bfb8b.508fb4"]]},{"id":"779bfb8b.508fb4","type":"function","z":"26aeea98.1c26c6","name":"rundata","func":"// This function return a fake json array\nvar runData = { r: 1, g: 0.4, b: 0 };\n\nmsg.runData = runData;\nreturn msg;","outputs":1,"noerr":0,"x":281.8957824707031,"y":154,"wires":[["1e257a50.7ecd46"]]},{"id":"1e257a50.7ecd46","type":"file in","z":"26aeea98.1c26c6","name":"","filename":"netdata","format":"utf8","x":426.8260803222656,"y":129.87503051757812,"wires":[["9deb749c.74dc68"]]},{"id":"9deb749c.74dc68","type":"change","z":"26aeea98.1c26c6","name":"msg.netData","rules":[{"t":"set","p":"netData","to":"msg.payload"}],"action":"","property":"","from":"","to":"","reg":false,"x":551.8368530273438,"y":214.84722900390625,"wires":[["4a24707d.efc24"]]},{"id":"4a24707d.efc24","type":"neuralNetwork","z":"26aeea98.1c26c6","name":"neuralNetwork","brainType":"run","usageMode":"0","inputKey":"","outputKey":"","learningRate":0.3,"hiddenLayers":"3,4","errorThresh":0.005,"iterations":20000,"logPeriod":10,"x":706.9999389648438,"y":289,"wires":[["f3d82851.fa5c38"]]}]
```
# License 

MIT License
\ No newline at end of file