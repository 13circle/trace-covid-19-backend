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

router.get("/", async function(req, res, next) {
  var resData = await getCovidData();
	res.send(JSON.stringify(resData.data, null, 2));
});

module.exports = router;
