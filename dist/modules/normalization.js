"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalization = void 0;
var getCleanNumber = function (number) {
    var checkNumber = number;
    var cleanNumber = number;
    if (number == 0 || number == 1) {
        return checkNumber;
    }
    else {
        for (var i = 1; checkNumber >= 10; i = i * 10) {
            checkNumber = number / i;
            cleanNumber = i;
        }
        return cleanNumber;
    }
};
var normalization = /** @class */ (function () {
    function normalization(data) {
        this.data = data;
        this.max = Math.max.apply(null, data);
        this.min = Math.min.apply(null, data);
        this.clean_max = getCleanNumber(this.max);
    }
    normalization.prototype.normalize = function () {
        var _this = this;
        /*return this.data.map(
          (_data: number) =>
            Math.round(
              ((_data - this.min) / (this.max - this.min)) * this.clean_max,
            ) / this.clean_max,
        );*/
        return this.data.map(function (_data) { return (_data - _this.min) / (_this.max - _this.min); });
    };
    normalization.prototype.de_normalize = function (normalizationData) {
        var _this = this;
        return normalizationData.map(function (_data) { return (_data + _this.min) * (_this.max - _this.min); });
    };
    return normalization;
}());
exports.normalization = normalization;
