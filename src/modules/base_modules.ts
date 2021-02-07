var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");
const path = require("path");
const get_json_data = (url: string) => {
  let xmlhttp = new XMLHttpRequest();
  let json_data: any;
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      try {
        json_data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
    }
  };
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  return json_data;
};

const save2json = (output_filePath: any, content: any) => {
  const string_json = JSON.stringify(content);
  fs.writeFile(output_filePath, string_json, function (err: any) {
    if (err) {
      return console.log(err);
    } else {
      console.log("json파일을 성공적으로 저장했습니다.");
    }
  });
};

const make_output_filepath = (name: string) => path.join(__dirname, `../../output/${name}.json`);

export { get_json_data, save2json, make_output_filepath };
