var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Blacklist = require("../models/blacklist.model");
const verify = require("./verifyToken");

router.post("/", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send("Pogresno korisnicko ime");
  }
  if (req.body.password !== user.password) {
    return res.status(400).send("Pogresna sifra");
  }
  const token = jwt.sign(
    { username: user.username, id: user._id, predmeti: user.predmeti },
    process.env.SECRET_TOKEN
  );
  res.cookie("JWT-auth", token, {
    maxAge: 86400000,
    httpOnly: true,
    secure: true,
  });
  res.json(user);
});

router.get("/logout", (req, res) => {
  const JWTcookie = req.cookies["JWT-auth"];
  newBlacklist = new Blacklist({ JWTcookie });
  newBlacklist
    .save()
    .then(() => res.status(200).send("Logged out"))
    .catch((err) => res.status(400).send(err));
});
router.get("/check", verify, (req, res) => {
  res.send(req.user);
});

module.exports = router;
