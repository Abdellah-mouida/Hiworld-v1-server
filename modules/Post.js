let mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
  description: String,
  createdAt: {
    type: Date,

    default: Date.now(),
  },
  likes: {
    type: Number,
    default: 0,
  },
  image: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Post", postSchema);
