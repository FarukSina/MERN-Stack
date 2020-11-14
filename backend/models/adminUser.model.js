const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminUserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    register_date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const adminUser = mongoose.model("AdminUser", adminUserSchema);

module.exports = adminUser;
