var express = require("express");
var router = express.Router();

var axios = require("axios");

router.get("/", function(req, res, next) {
	res.send("This is fetchdata API");
});

module.exports = router;
