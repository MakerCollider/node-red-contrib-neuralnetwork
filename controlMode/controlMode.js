module.exports = function(RED) {
    var collect = require('../nn-extends');

    function controlModeNode(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.collectKey = config.collectKey;
        this.collectValue = config.collectValue;
        this.trainKey = config.trainKey;
        this.trainValue = config.trainValue;
        this.saveKey = config.saveKey;
        this.saveValue = config.saveValue;
        this.runKey = config.runKey;
        this.runValue = config.runValue;
        this.resetKey = config.resetKey;
        this.resetValue = config.resetValue;
        this.outkey = config.outkey;
        var node = this;

        this.on('input', function (msg){
            var output_key = 'payload';
            var _output = node.outkey;
            (_output == '' || _output.length == 0) ? output_key = "payload" : output_key = node.outkey;
            if (msg.hasOwnProperty("KEY")){
                var keys = msg.KEY;
                for (var k in keys) {
                    if (keys.hasOwnProperty(k)) {
                        if (node.collectKey == k && node.collectValue == keys[k]){
                            node.status({fill: 'green',shape: 'dot',text: 'collect'});
                            msg[output_key] = 'collect';
                            _G_ControlMode = 'collect';
                            node.send(msg);
                        }
                        else if (node.trainKey == k && node.trainValue == keys[k]){
                            node.status({fill: 'green',shape: 'dot',text: 'train'});
                            msg[output_key] = 'train';
                            _G_ControlMode = 'train';
                            node.send(msg);
                        }
                        else if (node.runKey == k && node.runValue == keys[k]){
                            node.status({fill: 'green',shape: 'dot',text: 'run'});
                            msg[output_key] = 'run';
                            _G_ControlMode = 'run';
                            node.send(msg);
                        }
                        else if (node.resetKey == k && node.resetValue == keys[k]){
                            node.status({fill: 'yellow',shape: 'dot',text: 'none'});
                            msg[output_key] = 'none';
                            _G_ControlMode = 'none';
                            node.send(msg);
                        }
                        else if (node.saveKey == k && node.saveValue == keys[k]){
                            node.status({fill: 'green',shape: 'dot',text: 'save train data'});
                            msg[output_key] = 'save';
                            node.send(msg);
                        }
                    }
                }
            }
        });

        this.on('close', function() {
        });
    }
    RED.nodes.registerType("controlMode", controlModeNode);
}
