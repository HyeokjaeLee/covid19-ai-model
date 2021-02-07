"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var brain = require("../../brainjs/brain.js");
function create_ai_data(data) {
    var net = new brain.recurrent.LSTMTimeStep();
    net.train([data], {
        log: true,
        logPeriod: 10,
        iterations: 999999999999999,
        errorThresh: 0.1,
    });
    return net.toJSON();
}
exports.default = create_ai_data;
