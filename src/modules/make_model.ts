const brain = require("../../brainjs/brain.js");
export default function create_ai_data(data: any) {
  const net = new brain.recurrent.LSTMTimeStep();
  net.train([data.slice(0, 50)], {
    log: true,
    logPeriod: 1000,
    iterations: 2000000,
    errorThresh: 2,
  });
  return net.toJSON();
}
