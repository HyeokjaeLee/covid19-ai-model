"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var brain = require("../../brainjs/brain.js");
function create_ai_data(data) {
    var net = new brain.recurrent.LSTMTimeStep({
        inputSize: 3,
        hiddenLayers: [3],
        outputSize: 3,
    });
    console.log(data);
    net.train([data], {
        log: true,
        logPeriod: 1000,
        iterations: 999999999999999,
        errorThresh: 0.001,
    });
    return net.toJSON();
}
exports.default = create_ai_data;
