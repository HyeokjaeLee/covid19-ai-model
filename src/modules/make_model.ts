const brain = require("../../brainjs/brain.js");
export default function create_ai_data(
  data: any,
  errorThresh: number,
  testCount: number,
) {
  const net = new brain.recurrent.LSTMTimeStep({
    inputSize: 3,
    hiddenLayers: [10],
    outputSize: 3,
  });
  net.train([data], {
    log: true,
    logPeriod: 10,
    iterations: 1000000000000000,
    errorThresh: errorThresh,
  });
  const testData = data.slice(data.length - testCount - 1, data.length - 1);
  console.log("Prediction : " + net.run(testData));
  console.log("Actuality : " + data[data.length - 1]);
  return net.toJSON();
}
