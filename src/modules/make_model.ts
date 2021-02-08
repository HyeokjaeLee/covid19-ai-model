const brain = require("../../brainjs/brain.js");
export default function create_ai_data(data: any) {
  const net = new brain.recurrent.LSTMTimeStep({
    inputSize: 3,
    hiddenLayers: [3],
    outputSize: 3,
  });
  console.log(data);
  net.train([data], {
    log: true,
    logPeriod: 1000,
    iterations: 999999999999999,
    errorThresh: 0.001,
  });
  return net.toJSON();
}
