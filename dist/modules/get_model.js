"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var brain = require("../../brainjs/brain.js");
function get_model(json, input) {
    var data = input;
    var net = new brain.recurrent.LSTMTimeStep();
    net.fromJSON(json);
    for (var i = 0; i < 7; i++) {
        var data_2 = data.slice(0 + i, 7 + i);
        var test = net.run(data_2);
        data.push(test);
    }
    return data.slice(10, 17);
}
exports.default = get_model;
