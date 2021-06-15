var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const Student = require("../models/student.model");
const BlacklistStudent = require("../models/blacklistStudent.model");
const verify = require("./verifyTokenStudent");

router.post("/", async (req, res) => {
  const student = await Student.findOne({ username: req.body.username });
  if (!student) {
    return res.status(400).send("Pogresno korisnicko ime");
  }
  if (req.body.password !== student.password) {
    return res.status(400).send("Pogresna sifra");
  }
  const token = jwt.sign(
    { username: student.username, id: student._id, predmeti: student.predmeti },
    process.env.SECRET_TOKEN_STUDENT
  );
  res.cookie("JWT-auth-student", token, {
    maxAge: 86400000,
    httpOnly: true,
    secure: true,
  });
  res.json(student);
});

router.get("/logout", (req, res) => {
  const JWTcookie = req.cookies["JWT-auth-student"];
  newBlacklist = new BlacklistStudent({ JWTcookie });
  newBlacklist
    .save()
    .then(() => res.status(200).send("Logged out"))
    .catch((err) => res.status(400).send(err));
});
router.get("/check", verify, (req, res) => {
  res.send(req.user);
});

module.exports = router;
