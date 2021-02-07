"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make_output_filepath = exports.save2json = exports.get_json_data = void 0;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require("fs");
var path = require("path");
var get_json_data = function (url) {
    var xmlhttp = new XMLHttpRequest();
    var json_data;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                json_data = JSON.parse(xmlhttp.responseText);
            }
            catch (err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return json_data;
};
exports.get_json_data = get_json_data;
var save2json = function (output_filePath, content) {
    var string_json = JSON.stringify(content);
    fs.writeFile(output_filePath, string_json, function (err) {
        if (err) {
            return console.log(err);
        }
        else {
            console.log("json파일을 성공적으로 저장했습니다.");
        }
    });
};
exports.save2json = save2json;
var make_output_filepath = function (name) { return path.join(__dirname, "../../output/" + name + ".json"); };
exports.make_output_filepath = make_output_filepath;
