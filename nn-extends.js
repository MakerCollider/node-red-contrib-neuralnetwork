_G_ControlMode = 'none'; //collect、 train、 run
_G_inData  = {};
_G_outData = {};
_G_outDataSets = [];
_G_indata_completed = 0;
_G_outdata_completed = 0;
var collect = module.exports = {
    initStatus: function() {
        _G_indata_completed = 0;
        _G_outdata_completed = 0;
    },
    //indata
    setInDataValue: function(_key,_value) {
        _G_inData[_key] = _value;
    },
    getInDataValue: function(_key) {
        return _G_inData[_key];
    },
    setOutDataValue: function(_key,_value) {
        _G_outData[_key] = _value;
    },
    getOutDataValue: function(_key) {
        return _G_outData[_key];
    },
    appendData: function(_objData) {
        _G_outDataSets.push(_objData);
    },

    clearInData: function() {
        _G_inData = {}; 
    },
    clearOutData: function() {
        _G_outData = {};
    },
    clearAllData: function() {
        _G_outDataSets = [];
    }
};

