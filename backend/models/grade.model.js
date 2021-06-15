const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gradeSchema = new Schema(
  {
    predmet: String,
    vrijemeIspita: Date,
    profesor: String,
    profesorID: String,
    student: String,
    studentID: String,
    ocjena: Number,
    brojBodova: Number,
  },
  { timestamps: true }
);

const Grade = mongoose.model("Grade", gradeSchema);
module.exports = Grade;
