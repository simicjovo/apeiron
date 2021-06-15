const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 6,
      required: true,
      maxlength: 255,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
      maxlength: 1024,
    },
    predmeti: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
