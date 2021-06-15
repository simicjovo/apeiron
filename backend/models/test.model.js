const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testSchema = new Schema(
  {
    predmet: String,
    pitanja: Array,
    sadrziSlike: Boolean,
    vrijemeIspita: Date,
    profesor: String,
    profesorID: String,
    posebnoBodovanje: Boolean,
    strukturaIspita: Array,
    brojPitanjaNaTestu: Number,
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", testSchema);
module.exports = Test;
