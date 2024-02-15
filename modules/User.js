let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    requiered: [true, "Email is Required"],
  },
  password: {
    type: String,
    requiered: [true, "Password is Required"],
  },
  phoneNumber: {
    type: Number,
  },
});

module.exports = mongoose.model("User", UserSchema);
