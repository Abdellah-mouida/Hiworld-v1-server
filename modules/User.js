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
  password: {
    type: String,
    requiered: [true, "Password is Required"],
  },
  socialMedia: {
    facebook: String,
    instagrame: String,
    X: String,
    whatssap: String,
    mail: String,
  },
  phoneNumber: {
    type: Number,
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
  },
});

module.exports = mongoose.model("User", UserSchema);
