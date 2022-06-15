const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: { type: String },
    lname: { type: String},
    password: { type: String },
    email: { type: String, unique: true },
    address: { type: String }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
