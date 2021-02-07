const brain = require("../../brainjs/brain.js");
export default function create_ai_data(data: any) {
  const net = new brain.recurrent.LSTMTimeStep();
  net.train([data.slice(0, 10)], {
    log: true,
    logPeriod: 10,
    iterations: 999999999999999,
    errorThresh: 0.1,
  });
  return net.toJSON();
}
