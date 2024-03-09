let exprss = require("express");
const { models, model } = require("mongoose");
let router = exprss.Router();

router.get("/", (req, res) => {
  res.send("Hello, world! it's connected");
});

module.exports = router;
