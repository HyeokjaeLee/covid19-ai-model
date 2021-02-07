interface A_trade_data {
  ticker: string;
  trade_date: Date;
  company_name: string;
  insider_name: string;
  price: number;
  qty: number;
  owned: number;
  value: number;
}
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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

interface A_stock_data {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
}

const string_date_to_date_form = (string_date: string) => {
  const strArr: string[] = string_date.split("-");
  const numArr: number[] = [];
  for (let i = 0; i < 3; i++) {
    numArr[i] = Number(strArr[i]);
  }
  const date: Date = new Date(numArr[0], numArr[1] - 1, numArr[2]);
  return date;
};

const $2num = (string_data: string) => {
  return Number(string_data.replace("$", "").replace(/,/gi, ""));
};

export { $2num, string_date_to_date_form, get_json_data };
export type { A_trade_data, A_stock_data };
