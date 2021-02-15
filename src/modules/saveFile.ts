const fs = require("fs");
const path = require("path");

export const save2json = (output_filePath: any, content: any) => {
  const file_path = path.join(__dirname, `${output_filePath}.json`);
  const string_json = JSON.stringify(content);
  fs.writeFile(file_path, string_json, function (err: any) {
    if (err) {
      return console.log(err);
    } else {
      console.log("JSON파일을 성공적으로 저장했습니다.");
    }
  });
};
