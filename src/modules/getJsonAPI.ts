var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
export const getJsonAPI = (url: string) => {
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
