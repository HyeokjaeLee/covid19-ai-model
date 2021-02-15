"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getJsonAPI_1 = require("./modules/getJsonAPI");
var saveFile_1 = require("./modules/saveFile");
var make_model_1 = __importDefault(require("./modules/make_model"));
var covid19_api = getJsonAPI_1.getJsonAPI("https://toy-projects-api.herokuapp.com/covid19/korea/total").data;
var infected = [];
var recovered = [];
var death = [];
var data = covid19_api.map(function (data) {
    // infected.push(data.confirmed.infected.new.total);
    // recovered.push(data.confirmed.recovered.new);
    // death.push(data.confirmed.death.new);
    var newInfected = data.confirmed.infected.new.total;
    var newRecovered = data.confirmed.recovered.new;
    var newDeath = data.confirmed.death.new;
    return [newInfected, newRecovered, newDeath];
});
var save_model = function () {
    var new_data_json = make_model_1.default(data, 0.014, 14);
    saveFile_1.save2json("../../output/test", new_data_json);
};
save_model();
