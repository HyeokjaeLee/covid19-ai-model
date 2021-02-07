const brain = require("./brain.js");
import { get_json_data } from "./base_modules";
const data_api = get_json_data("https://toy-projects-api.herokuapp.com/covid19/korea/total");

const path = require("path");
const output_filePath = path.join(__dirname, "./output.json");

const fs = require("fs");
const save2csv = (output_filePath: any, content: any) => {
  fs.writeFile(output_filePath, content, function (err: any) {
    if (err) {
      return console.log(err);
    } else {
      console.log("csv파일을 성공적으로 저장했습니다.");
    }
  });
};
console.log(data_api);
const new_infected: any = [];
data_api.map((data: any) => {
  new_infected.push(data.confirmed.infected.new_infected.total);
});
console.log(new_infected);
const create_ai_data = () => {
  let Z = [new_infected.slice(0, 50)];
  console.log(Z);
  let test_X = new_infected.slice(0, 5);
  console.log("test_X=", test_X);
  const net = new brain.recurrent.LSTMTimeStep();
  const load_data: string = fs.readFileSync(output_filePath);
  const load_data_json = JSON.parse(load_data);

  /*net.train(Z, {
    log: true,
    logPeriod: 1000,
    iterations: 2000000,
    errorThresh: 0.1,
  });
  const json = net.toJSON();
  console.log(json);
  const string_json = JSON.stringify(json);
  console.log(string_json);
  save2csv(output_filePath, string_json);*/
  net.fromJSON(load_data_json);
  let output = net.run(test_X);
  console.log(output);
};
create_ai_data();
