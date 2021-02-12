"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_standard_deviation = function (data, average) {
    var total = data.reduce(function (acc, currValue) {
        var deviation = currValue - average;
        return acc + deviation * deviation;
    }, 0);
    return Math.sqrt(total / (data.length - 1));
};
var get_average = function (data) {
    return (data.reduce(function (acc, currValue) {
        return acc + currValue;
    }, 0) / data.length);
};
var Normalization = /** @class */ (function () {
    function Normalization(data) {
        this.data = data;
    }
    Normalization.prototype.by_standard_deviation = function () {
        var _this = this;
        this.average = get_average(this.data);
        this.standard_deviation = get_standard_deviation(this.data, this.average);
        return this.data.map(function (_data) { return (_data - _this.average) / _this.standard_deviation; });
    };
    Normalization.prototype.by_min_max = function () {
        var _this = this;
        this.max = Math.max.apply(null, this.data);
        this.min = Math.min.apply(null, this.data);
        return this.data.map(function (data) { return (data - _this.min) / (_this.max - _this.min); });
    };
    return Normalization;
}());
exports.default = Normalization;
