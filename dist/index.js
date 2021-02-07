"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var brain = require("../brainjs/brain.js");
var base_modules_1 = require("./modules/base_modules");
var make_model_1 = __importDefault(require("./modules/make_model"));
var data_api = base_modules_1.get_json_data("https://toy-projects-api.herokuapp.com/covid19/korea/seoul");
console.log(data_api);
var new_infected = [];
data_api.map(function (data) {
    new_infected.push(data.confirmed.infected.new_infected.total);
});
console.log(new_infected);
var test = make_model_1.default(new_infected);
console.log(test);
base_modules_1.save2json(base_modules_1.make_output_filepath("test"), test);
