"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_modules_1 = require("./modules/base_modules");
var make_model_1 = __importDefault(require("./modules/make_model"));
var covid19_api = base_modules_1.get_json_data("https://toy-projects-api.herokuapp.com/covid19/korea/total");
var new_infected = [];
var recovered = [];
var death = [];
covid19_api.map(function (data) {
    new_infected.push(data.confirmed.infected.new_infected.total);
    recovered.push(data.confirmed.recovered);
    death.push(data.confirmed.death);
});
var make_new_data = function (data) {
    var new_data = [];
    for (var i = 1; i < data.length; i++) {
        new_data.push(data[i] - data[i - 1]);
    }
    return new_data.filter(function (data) { return data >= 0 && data < 1000; });
};
var save_model = function (data, name) {
    var new_data = make_new_data(data);
    var new_data_json = make_model_1.default(new_data);
    base_modules_1.save2json(base_modules_1.make_output_filepath(name), new_data_json);
};
var new_infected_json = make_model_1.default(new_infected);
base_modules_1.save2json(base_modules_1.make_output_filepath("new_infected"), new_infected_json);
save_model(recovered, "new_recovered");
save_model(death, "new_death");
