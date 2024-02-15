let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");

let { emailAlreadyExist, validateEmail } = require("./sing");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  try {
    let result = await emailAlreadyExist(email);
    if (!validateEmail(email)) {
      res.status(400).send("Invalid Email Format");
      return;
    }
    if (!result) {
      res.status(404).send("Email Not Found");
      return;
    }

    if (await bcrypt.compare(password, result.password)) {
      res
        .status(200)
        .send({ message: "You're Logged in Succssefully", user: result });
    } else {
      res.status(400).send("Wrong Password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error !!");
  }
});

module.exports = router;
