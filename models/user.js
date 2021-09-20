const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "User's name is required."]
  },
  password: {
    type: String,
    required: [true, "User's password is required."]
  },
  active: {
    type: Boolean,
    default: true
  }
})

const User = mongoose.model('user', UserSchema);

module.exports = User;
