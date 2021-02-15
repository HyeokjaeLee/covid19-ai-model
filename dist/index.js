"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getJsonAPI_1 = require("./modules/getJsonAPI");
var saveFile_1 = require("./modules/saveFile");
var create_model_1 = require("./modules/create_model");
var normalization_1 = require("./modules/normalization");
var covid19_api = getJsonAPI_1.getJsonAPI("https://toy-projects-api.herokuapp.com/covid19/korea/total").data;
var data4learningCount = covid19_api.length;
var learningRequireData = (function () {
    var newInfected = [];
    var newRecovered = [];
    var newDeath = [];
    for (var i = 0; i < data4learningCount; i++) {
        newInfected.push(covid19_api[i].confirmed.infected.new.total);
        newRecovered.push(covid19_api[i].confirmed.recovered.new);
        newDeath.push(covid19_api[i].confirmed.death.new);
    }
    return {
        newInfected: newInfected,
        newRecovered: newRecovered,
        newDeath: newDeath,
    };
})();
console.log(learningRequireData);
var newInfected_ = new normalization_1.normalization(learningRequireData.newInfected);
var newRecovered_ = new normalization_1.normalization(learningRequireData.newRecovered);
var newDeath_ = new normalization_1.normalization(learningRequireData.newDeath);
var data4learning = (function () {
    var _data4learning = [];
    for (var i = 0; i < data4learningCount; i++) {
        _data4learning.push([
            newInfected_.normalize()[i],
            newRecovered_.normalize()[i],
            newDeath_.normalize()[i],
        ]);
    }
    return _data4learning;
})();
console.log(data4learning);
var brain = new create_model_1.brainJS(data4learning, 7);
var model = brain.learning();
var testData = brain.getTestData();
console.log(newInfected_.de_normalize([testData[0]]));
console.log(newRecovered_.de_normalize([testData[0]]));
console.log(newDeath_.de_normalize([testData[0]]));
console.log(learningRequireData.newInfected[learningRequireData.newInfected.length - 1]);
saveFile_1.save2json("../../output/test", model);
