let express = require("express");
let bcrypt = require("bcrypt");
let User = require("../modules/User");

let router = express.Router();

function validateEmail(email) {
  let pattern = /^[\w\.-]+@gmail+\.[a-zA-Z]{2,}$/;
  //   let pattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

async function emailAlreadyExist(email) {
  try {
    let users = await User.find();
    return users.length === 0
      ? false
      : users.find((user) => user.email === email);
  } catch (err) {
    console.log(err);
  }
}

router.post("/", async (req, res) => {
  let user = req.body;
  if (!/^[A-Za-z]+$/.test(req.body.name)) {
    res
      .status(400)
      .send("The Name Should have only Alphabetic Characters From A to Z ");
    return;
  }

  if (!validateEmail(user.email)) {
    res.status(400).send("Invalid Email Format");
    return;
  }

  try {
    let result = await emailAlreadyExist(user.email);
    if (result) {
      res
        .status(422)
        .send("Email is already exist , Please try with an other email");
      return;
    }
    let hashedPassword = await bcrypt.hash(user.password, 10);
    let newUser = new User({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send({ message: "You Singed Succssfully", user: newUser });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
module.exports.emailAlreadyExist = emailAlreadyExist;
module.exports.validateEmail = validateEmail;
