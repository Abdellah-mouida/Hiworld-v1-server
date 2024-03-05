let mongoose = require("mongoose");
const Message = require("./Message");

// let messageSchema = new mongoose.Schema({

// })

let chatRoomSchema = new mongoose.Schema({
  roomName: { type: String, requied: [true, "Chat Room Name is Required"] },
  roomType: {
    type: String,
    enum: ["private", "public"],
    default: "public",
  },
  roomLimit: Number,
  roomPassword: String,
  messages: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: { type: String, required: true },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  users: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
