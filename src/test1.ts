import { get_json_data, save2json, make_output_filepath } from "./modules/base_modules";
import Normalization from "./modules/normalization";
import make_model from "./modules/make_model";
const test = require("../output/covid_19_model.json");
const covid19_api = get_json_data("https://toy-projects-api.herokuapp.com/covid19/korea/total");
import get_model from "./modules/get_model";

const infected: number[] = [];
const recovered: number[] = [];
const death: number[] = [];
covid19_api.map((data: any) => {
  infected.push(data.confirmed.infected.new.total);
  recovered.push(data.confirmed.recovered.new);
  death.push(data.confirmed.death.new);
});
const learning_data_set = infected.slice(0, 300);
const test_data_set = infected.slice(300);
console.log(test_data_set.length);
const normalization = new Normalization(test_data_set);
const normalization_data_set = normalization.by_min_max();
const test_arr = normalization_data_set.slice(0, 17).map((data: number) => data * (normalization.max! - normalization.min!) + normalization.min!);
console.log(test_arr.slice(10, 17));
const output_arr = get_model(test, test_data_set.slice(0, 14));
const output_arr2 = output_arr.map((data: number) => data * (normalization.max! - normalization.min!) + normalization.min!);
console.log(output_arr2);
