const mongoose = require("mongoose");
const Name = require("./Name");
const Address = require("./Address");
const Image = require("./Image");
const {HMO_SCHEMA_REQUIRED} = require("./HMO");

const userSchema = new mongoose.Schema({
  name: Name,
  phone: {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  },
  email: {
    type: String,
    require: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    match: RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    ),
  },
  image: Image,
  address: Address,
  isAdmin: { type: Boolean, default: false },
  isDoctor: { type: Boolean, default: false },
  HMO: {type: mongoose.Schema.Types.ObjectId, required:true},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
