import { getJsonAPI } from "./modules/getJsonAPI";
import { save2json } from "./modules/saveFile";
import { brainJS } from "./modules/create_model";
import { normalization } from "./modules/normalization";
const covid19_api = getJsonAPI(
  "https://toy-projects-api.herokuapp.com/covid19/korea/total",
).data;
const data4learningCount: number = covid19_api.length;
const learningRequireData = (() => {
  const newInfected: number[] = [];
  const newRecovered: number[] = [];
  const newDeath: number[] = [];
  for (let i = 0; i < data4learningCount; i++) {
    newInfected.push(covid19_api[i].confirmed.infected.new.total);
    newRecovered.push(covid19_api[i].confirmed.recovered.new);
    newDeath.push(covid19_api[i].confirmed.death.new);
  }
  return {
    newInfected: newInfected,
    newRecovered: newRecovered,
    newDeath: newDeath,
  };
})();
console.log(learningRequireData);
const newInfected_ = new normalization(learningRequireData.newInfected);
const newRecovered_ = new normalization(learningRequireData.newRecovered);
const newDeath_ = new normalization(learningRequireData.newDeath);

const data4learning = (() => {
  const _data4learning: number[][] = [];
  for (let i = 0; i < data4learningCount; i++) {
    _data4learning.push([
      newInfected_.normalize()[i],
      newRecovered_.normalize()[i],
      newDeath_.normalize()[i],
    ]);
  }
  return _data4learning;
})();
console.log(data4learning);
const brain = new brainJS(data4learning, 7);
const model = brain.learning();
const testData = brain.getTestData();
console.log(newInfected_.de_normalize([testData[0]]));
console.log(newRecovered_.de_normalize([testData[0]]));
console.log(newDeath_.de_normalize([testData[0]]));
console.log(
  learningRequireData.newInfected[learningRequireData.newInfected.length - 1],
);
save2json("../../output/test", model);
