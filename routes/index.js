var express = require("express");
var appname = require("../package.json").name;
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: appname });
});

module.exports = router;
