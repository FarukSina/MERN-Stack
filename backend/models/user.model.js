const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// First we create a Schema for User Model, here we are defining the validations
// we expect from a username to be String, required, unique, trim which means
// if client puts space between letters or words, it will get trimmed off
// and min length should be not less than 3.
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
