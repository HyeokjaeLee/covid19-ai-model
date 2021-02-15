const brain = require("../../brainjs/brain.js");

export class brainJS {
  private net = new brain.recurrent.LSTMTimeStep({
    inputSize: 3,
    hiddenLayers: [20],
    outputSize: 3,
  });
  public data: number[][];
  public testCount: number;
  constructor(_data: number[][], _testCount: number) {
    this.data = _data;
    this.testCount = _testCount;
  }
  learning() {
    this.net.train([this.data], {
      log: true,
      logPeriod: 10,
      iterations: 1000000000000000,
      errorThresh: 0.13,
    });
    return this.net.toJSON();
  }
  getTestData() {
    const testData = this.data.slice(
      this.data.length - this.testCount - 1,
      this.data.length - 1,
    );
    return this.net.run(testData);
  }
}
