module.exports = function(RED) {
    var collect = require('../nn-extends');

    function inputCollectNode(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.inRules = config.inRules;
        this.outkey = config.outkey;
        var node = this;

        this.on('input', function (msg){
            var output_key = 'payload';
            var _output = node.outkey;
            (_output == '' || _output.length == 0) ? output_key = "payload" : output_key = node.outkey;
            //input
            for (var i=0; i<node.inRules.length; i++) {
                if (node.inRules[i].hasOwnProperty("name") && msg[node.inRules[i].name] != null  && !isNaN(msg[node.inRules[i].name])){
                    var arrIn = Object.keys(_G_inData);
                    if (arrIn.length < node.inRules.length){
                        collect.setInDataValue(node.inRules[i].name,msg[node.inRules[i].name]);
                    }
                }
            }

            //check data complete.
            var arrIn = Object.keys(_G_inData);
            if (arrIn.length == node.inRules.length){
                if (arrIn.length == 0){
                    _G_indata_completed = 0;
                    msg[output_key] = _G_inData;
                    node.send(msg);
                }
                else{
                    _G_indata_completed = 1;
                }
                
            }

            if (_G_indata_completed === 1){
                msg[output_key] = _G_inData;
                node.send(msg);
                collect.clearInData();
                _G_indata_completed = 0;
            }
        });

        this.on('close', function() {
            collect.clearInData();
            _G_indata_completed = 0;
        });
    }
    RED.nodes.registerType("inputCollect", inputCollectNode);
}
