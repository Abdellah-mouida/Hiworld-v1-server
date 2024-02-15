let exprss = require("express");
const { models, model } = require("mongoose");
let router = exprss.Router();

router.get("/", (req, res) => {
  res.send("Connected");
});

module.exports = router;
