import { get_json_data, save2json, make_output_filepath } from "./modules/base_modules";
import make_model from "./modules/make_model";
const covid19_api = get_json_data("https://toy-projects-api.herokuapp.com/covid19/korea/total");
const new_infected: number[] = [];
const recovered: number[] = [];
const death: number[] = [];
covid19_api.map((data: any) => {
  new_infected.push(data.confirmed.infected.new_infected.total);
  recovered.push(data.confirmed.recovered);
  death.push(data.confirmed.death);
});
const make_new_data = (data: number[]) => {
  const new_data: number[] = [];
  for (let i = 1; i < data.length; i++) {
    new_data.push(data[i] - data[i - 1]);
  }
  return new_data.filter((data) => data >= 0 && data < 1000);
};

const save_model = (data: number[], name: string) => {
  const new_data: number[] = make_new_data(data);
  const new_data_json: JSON = make_model(new_data);
  save2json(make_output_filepath(name), new_data_json);
};

const new_infected_json: JSON = make_model(new_infected);
save2json(make_output_filepath("new_infected"), new_infected_json);

save_model(recovered, "new_recovered");
save_model(death, "new_death");
