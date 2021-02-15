"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonAPI = void 0;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var getJsonAPI = function (url) {
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
exports.getJsonAPI = getJsonAPI;
