import { get_json_data, save2json, make_output_filepath } from "./modules/base_modules";
import Normalization from "./modules/normalization";
import make_model from "./modules/make_model";
const covid19_api = get_json_data("https://toy-projects-api.herokuapp.com/covid19/korea/total");

const infected: number[] = [];
const recovered: number[] = [];
const death: number[] = [];
covid19_api.map((data: any) => {
  infected.push(data.confirmed.infected.new.total);
  recovered.push(data.confirmed.recovered.new);
  death.push(data.confirmed.death.new);
});
const learning_data_set = infected.slice(0, 200);
const test_data_set = infected.slice(200);
console.log(test_data_set);
const normalization = new Normalization(learning_data_set);
const normalization_data_set = normalization.by_min_max();
console.log(normalization_data_set);

const save_model = () => {
  const new_data_json: JSON = make_model(normalization_data_set, 0.00001);
  save2json(make_output_filepath("model"), new_data_json);
};
save_model();
