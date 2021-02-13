"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_modules_1 = require("./modules/base_modules");
var normalization_1 = __importDefault(require("./modules/normalization"));
var test = require("../output/covid_19_model.json");
var covid19_api = base_modules_1.get_json_data("https://toy-projects-api.herokuapp.com/covid19/korea/total");
var get_model_1 = __importDefault(require("./modules/get_model"));
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
console.log(test_data_set.length);
var normalization = new normalization_1.default(test_data_set);
var normalization_data_set = normalization.by_min_max();
var test_arr = normalization_data_set.slice(0, 17).map(function (data) { return data * (normalization.max - normalization.min) + normalization.min; });
console.log(test_arr.slice(10, 17));
var output_arr = get_model_1.default(test, test_data_set.slice(0, 7));
var output_arr2 = output_arr.map(function (data) { return data * (normalization.max - normalization.min) + normalization.min; });
console.log(output_arr2);
