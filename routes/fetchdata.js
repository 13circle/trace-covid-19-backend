var express = require("express");
var FormData = require("form-data");
var axios = require("axios");
var router = express.Router();

var SEOUL_COVID_JSON_URL = "http://odc.data.seoul.go.kr/bigfile/iot/sheet/json/download.do";

async function getCovidData() {
  var form = new FormData();
  form.append("srvType", "S");
  form.append("infId", "OA-20279");
  form.append("serviceKind", 1);
  return await axios.post(
    SEOUL_COVID_JSON_URL,
    form,
    {
      headers: form.getHeaders(),
    }
  );
}

router.get("/covid19-description", async function(req, res, next) {
  var resData = await getCovidData();
  res.send(JSON.stringify(resData.data.DESCRIPTION));
});

router.get("/covid19-data", async function(req, res, next) {
  var resData = await getCovidData();
	res.send(JSON.stringify(resData.data.DATA.map((d) => {
    var corona19_date_str = (new String(d.corona19_date));
    var corona19_date_m = corona19_date_str.split(".").shift();
    var corona19_date_d = corona19_date_str.split(".").pop();
    var corona19_date_timestamp = (new Date(
      2020, corona19_date_m - 1, corona19_date_d
    )).getTime();
    return {
      corona19_id: d.corona19_id,
      corona19_leave_status: d.corona19_leave_status,
      corona19_area: d.corona19_area,
      corona19_date: corona19_date_timestamp,
    };
  })));
});

module.exports = router;
