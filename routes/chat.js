let express = require("express");
const Message = require("../modules/Message");
const ChatRoom = require("../modules/Chat-Room");
let router = express.Router();
let bcrypt = require("bcrypt");
let crypto = require("crypto");
router.get("/", async (req, res) => {
  try {
    let chats = await Message.find().populate("user");
    res.send(chats);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  let { message, id } = req.body;
  if (!message) return;
  try {
    let newMessage = new Message({ message: message, user: id });
    await newMessage.save();
    res.send("Message Sended Succssefully");
  } catch (err) {
    res.send(err);
  }
});
router.post("/chat-room", async (req, res) => {
  let room;
  try {
    let { roomName, roomType, roomLimit, roomPassword, creator } = req.body;
    if (!roomName) {
      res.status(400).send("Name is Required");
    }

    if (roomType === "public") {
      let newChatRoom = new ChatRoom({
        roomLimit,
        roomName,
        roomType,
        roomPassword,
        creator,
      });
      room = await newChatRoom.save();
    } else {
      let newChatRoom = new ChatRoom({
        roomLimit,
        roomName,
        roomType,
        roomPassword: await bcrypt.hash(roomPassword, 10),
        creator,
      });
      room = await newChatRoom.save();
    }
    res.send(room);
  } catch (err) {
    console.log(err);
  }
});

router.post("/chat-room/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { userId } = req.body;
    let chatRoom = await ChatRoom.findById(id);
    if (chatRoom.users.includes(userId)) {
      res.send(chatRoom);
    } else {
      if (chatRoom.users.length > chatRoom.roomLimit) {
        res.status(501).send("Full Chat Room");
        return;
      }
      chatRoom.users.push(userId);
      await chatRoom.save();

      res.send(chatRoom);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/chat-room/:id/messages", async (req, res) => {
  try {
    let { id } = req.params;

    let chatRoom = await ChatRoom.findById(id).populate("messages.user").exec();
    res.send(chatRoom.messages);
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log(err);
  }
});
router.post("/chat-room/:id/messages", async (req, res) => {
  let { message, id } = req.body;
  let roomId = req.params.id;
  if (!message) return;
  try {
    let chatRoom = await ChatRoom.findById(roomId);
    chatRoom.messages.push({ message, user: id });
    await chatRoom.save();

    res.send("Message Sended Succssefully");
  } catch (err) {
    res.send(err);
  }
});

router.get("/chat-room/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let chatRoom = await ChatRoom.findById(id);
    chatRoom.messages = [];
    res.send(chatRoom);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
