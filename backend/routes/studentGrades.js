const express = require("express");
const router = express.Router();
const verify = require("./verifyTokenStudent");

const Grade = require("../models/grade.model");

router.get("/", verify, async (req, res) => {
  let grades;
  await Grade.find({ studentID: req.user.id })
    .then((result) => (grades = result))
    .catch((err) => res.status(400).json(err));
  res.json(grades);
});

module.exports = router;
