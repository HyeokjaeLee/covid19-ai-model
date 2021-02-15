"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save2json = void 0;
var fs = require("fs");
var path = require("path");
var save2json = function (output_filePath, content) {
    var file_path = path.join(__dirname, output_filePath + ".json");
    var string_json = JSON.stringify(content);
    fs.writeFile(file_path, string_json, function (err) {
        if (err) {
            return console.log(err);
        }
        else {
            console.log("JSON파일을 성공적으로 저장했습니다.");
        }
    });
};
exports.save2json = save2json;
