import { get_json_data, save2json, make_output_filepath } from "./modules/base_modules";
import make_model from "./modules/make_model";
const covid19_api = get_json_data("https://toy-projects-api.herokuapp.com/covid19/korea/total");
const wanted_data = covid19_api
  .map((data: any) => ({
    new_infected: data.confirmed.infected.new_infected.total,
    recovered: data.confirmed.recovered,
    death: data.confirmed.death,
  }))
  .filter((data: any) => data.recovered >= 0 && data.recovered < 100000);
console.log(wanted_data);

const make_new_data = () => {
  const new_infected: number[] = [];
  const new_recovered: number[] = [];
  const new_death: number[] = [];
  for (let i = 1; i < wanted_data.length; i++) {
    new_infected.push(wanted_data[i].new_infected);
    new_recovered.push(wanted_data[i].recovered - wanted_data[i - 1].recovered);
    new_death.push(wanted_data[i].death - wanted_data[i - 1].death);
  }
  return { infected: new_infected, recovered: new_recovered, death: new_death };
};

const normalization = (data: number[]) => {
  const stddev = (data: number[]) => {
    //표준편차와 평균
    var total = 0;
    for (var i = 0; i < data.length; i++) total += data[i];
    var mean = total / data.length; // 여기서 평균인 3이 구해진다

    total = 0;
    for (var i = 0; i < data.length; i++) {
      var deviation = data[i] - mean;
      total += deviation * deviation;
    }
    const stddev = Math.sqrt(total / (data.length - 1));
    return { stddev: stddev, mean: mean };
  };
  const no_under0 = data.filter((data: number) => data >= 0);
  const find_max_value = (arr: number[]) => Math.max.apply(null, arr);
  const find_min_value = (arr: number[]) => Math.min.apply(null, arr);
  const max_number = find_max_value(no_under0);
  const min_number = find_min_value(no_under0);
  //const calcu = stddev(data);
  //const test = stddev([1, 2, 3, 4, 5]);
  //console.log(test);
  const processed_data = data.map((data: number) => (data - min_number) / (max_number - min_number));
  //const processed_data = data.map((data: number) => (data - calcu.mean) / calcu.stddev);
  return { max_number: max_number, data: processed_data };
  //return { calcu: calcu, data: processed_data };
};

const new_ = make_new_data();
const new_infected = normalization(new_.infected);
const new_recovered = normalization(new_.recovered);
const new_death = normalization(new_.death);
console.log(new_infected);
console.log(new_recovered);
console.log(new_death);

const data_set: number[][] = [];
for (let i = 0; i < new_infected.data.length; i++) {
  data_set.push([new_infected.data[i], new_recovered.data[i], new_death.data[i]]);
}
console.log(data_set);
const save_model = () => {
  //const new_data_json: JSON = make_model(new_infected.data, 0.001);
  //save2json(make_output_filepath("model"), new_data_json);
  const new_data_json2: JSON = make_model(new_recovered.data, 0.01);
  save2json(make_output_filepath("model2"), new_data_json2);
  //const new_data_json3: JSON = make_model(new_death.data, 0.01);
  //save2json(make_output_filepath("model3"), new_data_json3);
};
save_model();
