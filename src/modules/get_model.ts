const brain = require("../../brainjs/brain.js");
export default function get_model(json: any, input: number[]) {
  const data = input;
  const net = new brain.recurrent.LSTMTimeStep();
  net.fromJSON(json);
  for (let i = 0; i < 7; i++) {
    let data_2: any = data.slice(0 + i, 7 + i);
    const test = net.run(data_2);
    data.push(test);
  }
  return data.slice(10, 17);
}
