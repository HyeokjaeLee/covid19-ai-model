"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brainJS = void 0;
var brain = require("../../brainjs/brain.js");
var brainJS = /** @class */ (function () {
    function brainJS(_data, _testCount) {
        this.net = new brain.recurrent.LSTMTimeStep({
            inputSize: 3,
            hiddenLayers: [20],
            outputSize: 3,
        });
        this.data = _data;
        this.testCount = _testCount;
    }
    brainJS.prototype.learning = function () {
        this.net.train([this.data], {
            log: true,
            logPeriod: 10,
            iterations: 1000000000000000,
            errorThresh: 0.13,
        });
        return this.net.toJSON();
    };
    brainJS.prototype.getTestData = function () {
        var testData = this.data.slice(this.data.length - this.testCount - 1, this.data.length - 1);
        return this.net.run(testData);
    };
    return brainJS;
}());
exports.brainJS = brainJS;
