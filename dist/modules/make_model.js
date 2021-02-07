"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var brain = require("../../brainjs/brain.js");
function create_ai_data(data) {
    var net = new brain.recurrent.LSTMTimeStep();
    net.train([data.slice(0, 50)], {
        log: true,
        logPeriod: 1000,
        iterations: 2000000,
        errorThresh: 2,
    });
    return net.toJSON();
}
exports.default = create_ai_data;
