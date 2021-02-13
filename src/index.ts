import { get_json_data, save2json, make_output_filepath } from "./modules/base_modules";
import Normalization from "./modules/normalization";
import make_model from "./modules/make_model";
const test = require("../output/standard_deviation.json");
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
const normalization = new Normalization(infected);
const normalization_data_set = normalization.by_min_max();
console.log(normalization_data_set);
const save_model = () => {
  const new_data_json: JSON = make_model(normalization_data_set, 0.014);
  save2json(make_output_filepath("covid_19_model"), new_data_json);
};
save_model();
