"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var brain = require("../../brainjs/brain.js");
function create_ai_data(data, errorThresh, testCount) {
    var net = new brain.recurrent.LSTMTimeStep({
        inputSize: 3,
        hiddenLayers: [10],
        outputSize: 3,
    });
    net.train([data], {
        log: true,
        logPeriod: 10,
        iterations: 1000000000000000,
        errorThresh: errorThresh,
    });
    var testData = data.slice(data.length - testCount - 1, data.length - 1);
    console.log("Prediction : " + net.run(testData));
    console.log("Actuality : " + data[data.length - 1]);
    return net.toJSON();
}
exports.default = create_ai_data;
