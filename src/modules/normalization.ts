const getCleanNumber = (number: number): number => {
  let checkNumber = number;
  let cleanNumber: number = number;
  if (number == 0 || number == 1) {
    return checkNumber;
  } else {
    for (let i = 1; checkNumber >= 10; i = i * 10) {
      checkNumber = number / i;
      cleanNumber = i;
    }
    return cleanNumber;
  }
};

export class normalization {
  public data: number[];
  public max: number;
  public clean_max: number;
  public min: number;

  constructor(data: number[]) {
    this.data = data;
    this.max = Math.max.apply(null, data);
    this.min = Math.min.apply(null, data);
    this.clean_max = getCleanNumber(this.max);
  }
  normalize() {
    /*return this.data.map(
      (_data: number) =>
        Math.round(
          ((_data - this.min) / (this.max - this.min)) * this.clean_max,
        ) / this.clean_max,
    );*/
    return this.data.map(
      (_data: number) => (_data - this.min) / (this.max - this.min),
    );
  }
  de_normalize(normalizationData: number[]) {
    return normalizationData.map(
      (_data: number) => (_data + this.min) * (this.max - this.min),
    );
  }
}
