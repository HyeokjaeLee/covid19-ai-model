"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_modules_1 = require("./modules/base_modules");
var make_model_1 = __importDefault(require("./modules/make_model"));
var covid19_api = base_modules_1.get_json_data("https://toy-projects-api.herokuapp.com/covid19/korea/total");
var wanted_data = covid19_api
    .map(function (data) { return ({
    new_infected: data.confirmed.infected.new_infected.total,
    recovered: data.confirmed.recovered,
    death: data.confirmed.death,
}); })
    .filter(function (data) { return data.recovered >= 0 && data.recovered < 100000; });
console.log(wanted_data);
var make_new_data = function () {
    var new_infected = [];
    var new_recovered = [];
    var new_death = [];
    for (var i = 1; i < wanted_data.length; i++) {
        new_infected.push(wanted_data[i].new_infected);
        new_recovered.push(wanted_data[i].recovered - wanted_data[i - 1].recovered);
        new_death.push(wanted_data[i].death - wanted_data[i - 1].death);
    }
    return { infected: new_infected, recovered: new_recovered, death: new_death };
};
var normalization = function (data) {
    var stddev = function (data) {
        //표준편차와 평균
        var total = 0;
        for (var i = 0; i < data.length; i++)
            total += data[i];
        var mean = total / data.length; // 여기서 평균인 3이 구해진다
        total = 0;
        for (var i = 0; i < data.length; i++) {
            var deviation = data[i] - mean;
            total += deviation * deviation;
        }
        var stddev = Math.sqrt(total / (data.length - 1));
        return { stddev: stddev, mean: mean };
    };
    var no_under0 = data.filter(function (data) { return data >= 0; });
    var find_max_value = function (arr) { return Math.max.apply(null, arr); };
    var find_min_value = function (arr) { return Math.min.apply(null, arr); };
    var max_number = find_max_value(no_under0);
    var min_number = find_min_value(no_under0);
    //const calcu = stddev(data);
    //const test = stddev([1, 2, 3, 4, 5]);
    //console.log(test);
    var processed_data = data.map(function (data) { return (data - min_number) / (max_number - min_number); });
    //const processed_data = data.map((data: number) => (data - calcu.mean) / calcu.stddev);
    return { max_number: max_number, data: processed_data };
    //return { calcu: calcu, data: processed_data };
};
var new_ = make_new_data();
var new_infected = normalization(new_.infected);
var new_recovered = normalization(new_.recovered);
var new_death = normalization(new_.death);
console.log(new_infected);
console.log(new_recovered);
console.log(new_death);
var data_set = [];
for (var i = 0; i < new_infected.data.length; i++) {
    data_set.push([new_infected.data[i], new_recovered.data[i], new_death.data[i]]);
}
console.log(data_set);
var save_model = function () {
    //const new_data_json: JSON = make_model(new_infected.data, 0.001);
    //save2json(make_output_filepath("model"), new_data_json);
    //const new_data_json2: JSON = make_model(new_recovered.data, 0.001);
    //save2json(make_output_filepath("model2"), new_data_json2);
    var new_data_json3 = make_model_1.default(new_death.data, 0.01);
    base_modules_1.save2json(base_modules_1.make_output_filepath("model3"), new_data_json3);
};
save_model();
