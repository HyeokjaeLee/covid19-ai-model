import { get_json_data, save2json, make_output_filepath } from "./modules/base_modules";
import make_model from "./modules/make_model";
const data_api = get_json_data("https://toy-projects-api.herokuapp.com/covid19/korea/total");
console.log(data_api);
const new_infected: any = [];
data_api.map((data: any) => {
  new_infected.push(data.confirmed.infected.new_infected.total);
});
console.log(new_infected);
const test: JSON = make_model(new_infected);
console.log(test);
save2json(make_output_filepath("test"), test);
