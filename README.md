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
[{"id":"ff50be62.40998","type":"inject","z":"496f001a.0cd7f","name":"train","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":143.8958282470703,"y":407.8888854980469,"wires":[["ae34349.ba5bfc8"]]},{"id":"ae34349.ba5bfc8","type":"function","z":"496f001a.0cd7f","name":"traindata","func":"// This function return a fake json array\nvar trainData = [{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},\n           {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},\n           {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}];\n\nmsg.trainData = trainData;\nreturn msg;","outputs":1,"noerr":0,"x":284.8957977294922,"y":406.8888854980469,"wires":[["c0201ae5.864698"]]},{"id":"c0201ae5.864698","type":"neuralNetwork","z":"496f001a.0cd7f","name":"neuralNetwork","brainType":"train","learningRate":0.3,"hiddenLayers":"3,4","errorThresh":0.005,"iterations":20000,"logPeriod":10,"x":486.72911071777344,"y":403.72222900390625,"wires":[["7f0548cb.3a53d8"]]},{"id":"7f0548cb.3a53d8","type":"debug","z":"496f001a.0cd7f","name":"","active":true,"console":"false","complete":"payload","x":688.8957977294922,"y":399.8888854980469,"wires":[]}]
```
File

```json
[{"id":"6dfd57c7.97c488","type":"file","z":"5f229c05.6151c4","name":"","filename":"netdata","appendNewline":true,"createDir":true,"overwriteFile":"true","x":688.8402557373047,"y":90.96530151367188,"wires":[]},{"id":"f0b9653f.3c7498","type":"neuralNetwork","z":"5f229c05.6151c4","name":"neuralNetwork","brainType":"train","learningRate":0.3,"hiddenLayers":"3,4","errorThresh":0.005,"iterations":20000,"logPeriod":10,"x":466.8332977294922,"y":93.72222900390625,"wires":[["6dfd57c7.97c488"]]},{"id":"f726b678.8370e8","type":"function","z":"5f229c05.6151c4","name":"traindata","func":"// This function return a fake json array\nvar trainData = [{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},\n           {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},\n           {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}];\n\nmsg.trainData = trainData;\nreturn msg;","outputs":1,"noerr":0,"x":273.99993896484375,"y":98.88888549804688,"wires":[["f0b9653f.3c7498"]]},{"id":"1bcaffdc.bb291","type":"inject","z":"5f229c05.6151c4","name":"train","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":122,"y":104.88888549804688,"wires":[["f726b678.8370e8"]]}]
```
Sensor

## Run:

```json
[{"id":"8cee087a.8122c8","type":"neuralNetwork","z":"496f001a.0cd7f","name":"neuralNetwork","brainType":"run","learningRate":0.3,"hiddenLayers":"3,4","errorThresh":0.005,"iterations":20000,"logPeriod":10,"x":528.8957366943359,"y":251.88888549804688,"wires":[["e8aac9ac.195888"]]},{"id":"bfcdf274.76beb","type":"function","z":"496f001a.0cd7f","name":"rundata & netdata","func":"// This function return a fake json array\nvar netData = {\"layers\":[{\"b\":{},\"g\":{},\"r\":{}},{\"0\":{\"bias\":-0.9607698911892122,\"weights\":{\"b\":-0.8241525249603725,\"g\":3.537892108679892,\"r\":-2.716488101274963}},\"1\":{\"bias\":-1.1516024332750348,\"weights\":{\"b\":-1.0126001075152462,\"g\":4.353715735686107,\"r\":-3.2233345935870257}},\"2\":{\"bias\":0.4888619188275802,\"weights\":{\"b\":0.41953281378406115,\"g\":-0.9601032184316537,\"r\":0.7482923208072509}}},{\"0\":{\"bias\":1.3094754653086798,\"weights\":{\"0\":-2.600636916847057,\"1\":-3.396884376808377,\"2\":1.487054322123148}},\"1\":{\"bias\":0.5312262343955613,\"weights\":{\"0\":-1.9723085220356809,\"1\":-2.1034572097575244,\"2\":0.7000633911919903}},\"2\":{\"bias\":1.0872088028804758,\"weights\":{\"0\":-2.276035491011995,\"1\":-2.9679744880891796,\"2\":1.1001576381403693}},\"3\":{\"bias\":0.15821536225567093,\"weights\":{\"0\":-1.4435204625392943,\"1\":-2.09799352420935,\"2\":0.658272707668071}}},{\"white\":{\"bias\":-2.9740426876751234,\"weights\":{\"0\":3.0932096393643187,\"1\":1.7436477393563405,\"2\":2.7758308414721604,\"3\":1.5272730436751654}},\"black\":{\"bias\":3.005161280623962,\"weights\":{\"0\":-3.2448772390674048,\"1\":-1.9132040734678886,\"2\":-2.4921726882588526,\"3\":-1.6120206348469082}}}],\"outputLookup\":true,\"inputLookup\":true};\nvar runData = { r: 1, g: 0.4, b: 0 };\n\nmsg.runData = runData;\nmsg.netData = netData;\nreturn msg;","outputs":1,"noerr":0,"x":306.8957824707031,"y":252.88888549804688,"wires":[["8cee087a.8122c8"]]},{"id":"773a5a72.0c89d4","type":"inject","z":"496f001a.0cd7f","name":"run","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":131.8958282470703,"y":253.88888549804688,"wires":[["bfcdf274.76beb"]]},{"id":"e8aac9ac.195888","type":"debug","z":"496f001a.0cd7f","name":"","active":true,"console":"false","complete":"payload","x":720.8957977294922,"y":255.88888549804688,"wires":[]}]
```
File

```json
[{"id":"26c2bea8.b20812","type":"file in","z":"5f229c05.6151c4","name":"","filename":"netdata","format":"utf8","x":371.8262176513672,"y":356.763916015625,"wires":[["f307ca1e.f31d78"]]},{"id":"8e418104.7c2e9","type":"function","z":"5f229c05.6151c4","name":"rundata","func":"// This function return a fake json array\nvar runData = { r: 1, g: 0.4, b: 0 };\n\nmsg.runData = runData;\nreturn msg;","outputs":1,"noerr":0,"x":220.89578247070312,"y":355.8888854980469,"wires":[["26c2bea8.b20812"]]},{"id":"37cbc9fd.166896","type":"inject","z":"5f229c05.6151c4","name":"run","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":85,"y":356.8888854980469,"wires":[["8e418104.7c2e9"]]},{"id":"f307ca1e.f31d78","type":"neuralNetwork","z":"5f229c05.6151c4","name":"neuralNetwork","brainType":"run","learningRate":0.3,"hiddenLayers":"3,4","errorThresh":0.005,"iterations":20000,"logPeriod":10,"x":562.9999237060547,"y":355.8888854980469,"wires":[["ae0e7f3c.4df51"]]},{"id":"ae0e7f3c.4df51","type":"debug","z":"5f229c05.6151c4","name":"","active":true,"console":"false","complete":"payload","x":754.9999847412109,"y":354.8888854980469,"wires":[]}]
```

# License 

MIT License
\ No newline at end of file