import { getJsonAPI } from "./modules/getJsonAPI";
import { save2json } from "./modules/saveFile";
import make_model from "./modules/make_model";
const covid19_api = getJsonAPI(
  "https://toy-projects-api.herokuapp.com/covid19/korea/total",
).data;

const infected: number[] = [];
const recovered: number[] = [];
const death: number[] = [];
const data = covid19_api.map((data: any) => {
  // infected.push(data.confirmed.infected.new.total);
  // recovered.push(data.confirmed.recovered.new);
  // death.push(data.confirmed.death.new);
  const newInfected = data.confirmed.infected.new.total;
  const newRecovered = data.confirmed.recovered.new;
  const newDeath = data.confirmed.death.new;
  return [newInfected, newRecovered, newDeath];
});
const save_model = () => {
  const new_data_json: JSON = make_model(data, 0.014, 14);
  save2json("../../output/test", new_data_json);
};
save_model();
