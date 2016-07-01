var netData;
module.exports = function(RED){
    var collect = require('../nn-extends');
    var fs = require('fs');
    var path = require('path');
    var brain = require('brain');

    function neuralNetworkNode(config){
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.brainType = config.brainType;
        this.usageMode = config.usageMode;
        this.modeKey = config.modeKey;
        this.inputKey = config.inputKey;
        this.outputKey = config.outputKey;
        this.learningRate = config.learningRate;
        this.hiddenLayers = config.hiddenLayers;
        this.errorThresh = config.errorThresh;
        this.iterations = config.iterations;
        this.logPeriod = config.logPeriod;
        this.inputData = {};
        this.tempInputData = {};
        this.outputData = {};
        this.trainStatus = 0;
        var node = this;

        node.status({fill: 'green',shape: 'dot',text: 'ready'});

        var hiddenLayers;
        if(!isNaN(node.hiddenLayers)){
            hiddenLayers = node.hiddenLayers;
        }
        else{
            hiddenLayers = node.hiddenLayers.split(',');
        }
            
        var neuralNetworkOptions = {
            hiddenLayers: hiddenLayers,//[6,8],
            learningRate: node.learningRate,
            iterations: node.iterations,
            errorThresh: node.errorThresh,  // error threshold to reach
            log: false,           // console.log() progress periodically
            logPeriod: node.logPeriod      // number of iterations between logging
        } 

        var net = new brain.NeuralNetwork(neuralNetworkOptions);


        this.on('input', function(msg){
            if (node.usageMode == 0) { //Common
                if (node.brainType == 'run') {
                    run(node,net,msg,msg.netData,msg.runData);
                }
                else{
                    train(node,net,msg,msg.trainData);
                }
            }

            if (node.usageMode == 1) { //Advanced
                node.status({fill: 'green',shape: 'dot',text: _G_ControlMode});
                console.log(_G_ControlMode);
                var input_key = 'payload1';
                var output_key = 'payload2';
                var _input = node.inputKey;
                var _output = node.outputKey;
                (_input == '' || _input.length == 0) ? input_key = input_key : input_key = node.inputKey;
                (_output == '' || _output.length == 0) ? output_key = output_key : output_key = node.outputKey;

                //check data complete.
                if (msg.hasOwnProperty(input_key)){
                    node.inputData = msg[input_key];
                    //console.log('collect-input:');
                    //console.log(node.inputData);
                }

                if (_G_ControlMode == 'collect'){
                    // collect input & output
                    if (msg.hasOwnProperty(output_key)){
                        node.outputData = msg[output_key];
                        //console.log('collect-output:');
                        //console.log(node.outputData);
                    }

                    var mode_key = 'Mode';
                    if (msg.hasOwnProperty(mode_key)){
                        if (msg[mode_key] == 'tempSave'){
                            console.log('temp save:');
                            var arrIn = Object.keys(node.inputData);
                            if (arrIn.length >0){
                                node.tempInputData = node.inputData;
                                msg.temp = node.tempInputData;
                                node.send(msg);
                            }
                        }
                        if (msg[mode_key] == 'save'){
                            console.log('save:');
                            console.log('temp:');
                            console.log(node.tempInputData);
                            console.log(node.outputData);
                            var arrIn = Object.keys(node.tempInputData);
                            var arrOut = Object.keys(node.outputData);
                            if (arrIn.length >0 && arrOut.length > 0){
                                var groupData = {
                                    'input':node.tempInputData,
                                    'output':node.outputData,
                                };
                                collect.appendData(groupData);

                                console.log("data-set:");
                                console.log(_G_outDataSets);
                               //save train data
                                var jsonStr = JSON.stringify(_G_outDataSets);
                                var fileName = 'train-data-file';
                                var dataFile = path.join(__dirname)+'../../../'+fileName;
                                dataFile = '/home/root/node-red/'+fileName;
                                fs.writeFile(dataFile, jsonStr, function (err) {
                                    if (err) {
                                        node.status({fill: 'red',shape: 'dot',text: 'train-data save faild!'});
                                    }
                                    node.tempInputData = {};
                                    node.inputData = {};
                                    node.outputData = {};
                                    node.status({fill: 'green',shape: 'dot',text: 'train-data save success!'});
                                    console.log("train data file "+fileName+" is generated success!");
                                });
                            }
                        }
                    }

                }
                if (_G_ControlMode == 'train' && node.trainStatus === 0){
                    collect.clearAllData();
                    node.status({fill: 'yellow',shape: 'dot',text: 'training'});
                    node.trainStatus = 1;
                    var fileName = 'train-data-file';
                    var dataFile = path.join(__dirname)+'../../../'+fileName;
                    dataFile = '/home/root/node-red/'+fileName;
                    var contentText = fs.readFileSync(dataFile,'utf-8');
                    msg.trainData = JSON.parse(contentText);
                    if (typeof(msg.trainData)!='undefined'){
                        train(node,net,msg,msg.trainData,fs,path);
                    }
                }
                if (_G_ControlMode == 'run'){
                    collect.clearAllData();
                    var fileName = 'net-data-file';
                    var dataFile = path.join(__dirname)+'../../../'+fileName;
                    dataFile = '/home/root/node-red/'+fileName;
                    var contentText = fs.readFileSync(dataFile,'utf-8');
                    if (contentText != '' && contentText.length > 0){
                        msg.netData = JSON.parse(contentText);
                        var arrIn = Object.keys(node.inputData);
                        if (arrIn.length >0){
                            run(node,net,msg,msg.netData,node.inputData);
                        }
                    }
                }
                if (_G_ControlMode == 'none'){
                    collect.clearAllData();
                }
            }

            function train(_node,_net,_msg,_trainData,_fs,_path){
                _node.status({fill: 'yellow',shape: 'dot',text: 'training'});
                var trainData;
                if (typeof(_trainData) == 'string'){
                    trainData = JSON.parse(_trainData);
                }
                else if (typeof(_trainData) == 'object'){
                    trainData = _trainData;
                }

                _node.status({fill: 'yellow',shape: 'dot',text: 'training'});
                var trainStream = _net.createTrainStream({
                    floodCallback: function() {
                        flood(trainStream, trainData);
                    },
                    doneTrainingCallback: function(obj) {
                        _msg.payload = _net.toJSON();
                        netData = _net.toJSON();
                        if (typeof(netData)!='undefined' && typeof(_msg.payload)!='undefined'){
                            _node.send(_msg);
                            _node.status({fill: 'green',shape: 'dot',text: 'trainning done'});

                            
                            if (_node.usageMode == 1){
                                var jsonStr = JSON.stringify(netData);
                                if (jsonStr != '' && jsonStr.length > 0){
                                    //save net data
                                    var fileName = 'net-data-file';
                                    var dataFile = _path.join(__dirname)+'../../../'+fileName;
                                    dataFile = '/home/root/node-red/'+fileName;
                                    _fs.writeFile(dataFile, jsonStr, function (err) {
                                        if (err) {
                                            _node.status({fill: 'red',shape: 'dot',text: 'net-data save faild!'});
                                            _node.trainStatus = 0;
                                        }
                                    });
                                }
                            }
                        }
                    }
                });

                flood(trainStream, trainData);
            }

            function run(_node,_net,_msg,_netData,_runData){
                if (typeof(_netData) == 'string'){
                    netData = JSON.parse(_netData);
                }
                else if (typeof(_netData) == 'object'){
                    netData = _netData;
                }
    
                var runData;
                if (typeof(_runData) == 'string'){
                    runData = JSON.parse(_runData);
                }
                else if (typeof(_runData) == 'object'){
                    runData = _runData;
                }

                if (typeof(netData)!='undefined' && typeof(runData)!='undefined'){
                    _net.fromJSON(netData);
                    var resultData = _net.run(runData);
                    _msg.payload = resultData;
                    _node.status({fill: 'green',shape: 'dot',text: 'running done'});
                    if (_node.usageMode == 1){
                        if (typeof(resultData)!='undefined'){
                            var currentValue = 0;
                            var currentKey;
                            var optimalValue;
                            
                            for (var k in resultData) {
                                if (resultData[k] > currentValue){
                                    currentValue = resultData[k];
                                    currentKey = k;
                                }
                            }

                            //driver example
                            var driver = {forwards:1,backwards:2,leftwards:3,rightwards:4};
                            for (var k in driver) {
                                if (currentKey == k){
                                    optimalValue = driver[k];
                                }
                            }
                        
                            if (typeof(optimalValue)!='undefined'){
                                _msg.payload = optimalValue;
                                _node.send(_msg);
                            }
                        }
                    }
                    else{
                        _node.send(_msg);
                    }
                }
            }

            function flood(stream, data) {
                for (var i = 0; i < data.length; i++) {
                    stream.write(data[i]);
                }
                stream.write(null);
            }
        });
    }
    
    RED.nodes.registerType('neuralNetwork', neuralNetworkNode);
}