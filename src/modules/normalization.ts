const get_standard_deviation = (data: number[], average: number): number => {
  const total = data.reduce(function (acc, currValue) {
    const deviation = currValue - average;
    return acc + deviation * deviation;
  }, 0);
  return Math.sqrt(total / (data.length - 1));
};
const get_average = (data: number[]): number => {
  return (
    data.reduce(function (acc, currValue) {
      return acc + currValue;
    }, 0) / data.length
  );
};

export default class Normalization {
  public data: number[];
  public average: number | undefined;
  public standard_deviation: number | undefined;
  public min: number | undefined;
  public max: number | undefined;

  constructor(data: number[]) {
    this.data = data;
  }
  by_standard_deviation() {
    this.average = get_average(this.data);
    this.standard_deviation = get_standard_deviation(this.data, this.average);
    return this.data.map((_data: number) => (_data - this.average!) / this.standard_deviation!);
  }
  by_min_max() {
    this.max = Math.max.apply(null, this.data);
    this.min = Math.min.apply(null, this.data);
    return this.data.map((data: number) => (data - this.min!) / (this.max! - this.min!));
  }
}
