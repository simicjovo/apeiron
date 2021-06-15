const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trenutniTestSchema = new Schema(
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
    studentID: String,
    expireAt: Date,
    finished: Boolean,
  },
  { timestamps: true }
);

trenutniTestSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const trenutniTest = mongoose.model("TrenutniTest", trenutniTestSchema);
module.exports = trenutniTest;
