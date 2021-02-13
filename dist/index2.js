"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_modules_1 = require("./modules/base_modules");
var normalization_1 = __importDefault(require("./modules/normalization"));
var make_model_1 = __importDefault(require("./modules/make_model"));
var test = require("../output/standard_deviation.json");
var covid19_api = base_modules_1.get_json_data("https://toy-projects-api.herokuapp.com/covid19/korea/total");
var infected = [];
var recovered = [];
var death = [];
covid19_api.map(function (data) {
    infected.push(data.confirmed.infected.new.total);
    recovered.push(data.confirmed.recovered.new);
    death.push(data.confirmed.death.new);
});
var learning_data_set = infected.slice(0, 300);
var test_data_set = infected.slice(300);
var normalization = new normalization_1.default(learning_data_set);
var normalization_data_set = normalization.by_min_max();
console.log(normalization_data_set);
//get_model(test, test_data_set.slice(0, 10));
var save_model = function () {
    var new_data_json = make_model_1.default(normalization_data_set, 0.01);
    base_modules_1.save2json(base_modules_1.make_output_filepath("standard_deviation"), new_data_json);
};
save_model();
