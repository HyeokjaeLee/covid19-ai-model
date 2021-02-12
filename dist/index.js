"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_modules_1 = require("./modules/base_modules");
var normalization_1 = __importDefault(require("./modules/normalization"));
var make_model_1 = __importDefault(require("./modules/make_model"));
var covid19_api = base_modules_1.get_json_data("https://toy-projects-api.herokuapp.com/covid19/korea/total");
var infected = [];
var recovered = [];
var death = [];
covid19_api.map(function (data) {
    infected.push(data.confirmed.infected.new.total);
    recovered.push(data.confirmed.recovered.new);
    death.push(data.confirmed.death.new);
});
var learning_data_set = infected.slice(0, 200);
var test_data_set = infected.slice(200);
console.log(test_data_set);
var normalization = new normalization_1.default(infected);
console.log(normalization.max);
var normalization_data_set = normalization.by_min_max();
console.log(normalization_data_set);
console.log(normalization.max);
var save_model = function () {
    var new_data_json = make_model_1.default(normalization_data_set, 0.0135);
    base_modules_1.save2json(base_modules_1.make_output_filepath("model"), new_data_json);
};
save_model();
