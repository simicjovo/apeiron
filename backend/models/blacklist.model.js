const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blacklistSchema = new Schema({
  JWTcookie: String,
  expireAt: {
    type: Date,
    default: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    expires: 259200,
  },
});

const Blacklist = mongoose.model("blacklist", blacklistSchema);
module.exports = Blacklist;
