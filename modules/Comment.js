let mongoose = require("mongoose");

let commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Comment", commentSchema);
