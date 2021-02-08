const brain = require("../../brainjs/brain.js");
export default function create_ai_data(data: any, errorThresh: number) {
  const net = new brain.recurrent.LSTMTimeStep();
  console.log(data);
  net.train([data], {
    log: true,
    logPeriod: 1000,
    iterations: 999999999999999,
    errorThresh: errorThresh,
  });
  return net.toJSON();
}
