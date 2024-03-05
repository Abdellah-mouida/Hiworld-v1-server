let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  profile: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
    requiered: [true, "Email is Required"],
    lowercase: true,
  },
  SERIAL_CODE: { type: String, required: true },
  password: {
    type: String,
    requiered: [true, "Password is Required"],
  },

  phoneNumber: {
    type: String,
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
  },
  bio: String,
  gender: { type: String, enum: ["Male", "Female"] },
  birthDay: Date,
  country: String,
  saved: { type: [mongoose.Schema.Types.ObjectId], ref: "Post" },
  following: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  followers: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
});

module.exports = mongoose.model("User", UserSchema);
// likedPosts: { type: [mongoose.Schema.Types.ObjectId], ref: "Post" },
