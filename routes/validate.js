let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");

let User = require("../modules/User");
const ChatRoom = require("../modules/Chat-Room");

router.get("/id/:id", async (req, res) => {
  let { id } = req.params;
  let allUsers = await User.find({});
  let isValid = allUsers.find((user) => user.id === id);

  if (!isValid) {
    res.status(400).send("Invalid Email");
    return;
  }

  res.status(200).send("Email is Valid");
});

router.post("/chat-room/:id/password", async (req, res) => {
  try {
    let { password } = req.body;
    let { id } = req.params;
    let chatRoom = await ChatRoom.findById(id);
    if (await bcrypt.compare(password, chatRoom.roomPassword)) {
      res.send("Succssefully");
    } else {
      res.status(401).send("Wrong Password");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
