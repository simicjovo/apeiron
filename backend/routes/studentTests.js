const express = require("express");
const router = express.Router();
const verify = require("./verifyTokenStudent");
const jwt = require("jsonwebtoken");

const Test = require("../models/test.model");
const trenutniTest = require("../models/trenutniTest.model.js");
const Grade = require("../models/grade.model");
const Student = require("../models/student.model");

const lessThanOneHourAgo = (date) => {
  const HOUR = 1000 * 60 * 60;
  const anHourAgo = new Date().getTime() - date.getTime();
  return anHourAgo < HOUR && anHourAgo > 0;
};

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

router.get("/get", verify, async (req, res) => {
  let rezultat = [];
  await Promise.all(
    req.user.predmeti.map(async (predmet) => {
      await Test.find({
        profesorID: predmet.profesorID,
        predmet: predmet.nazivPredmeta,
      })
        .then((result) => {
          result[0].pitanja = undefined;
          rezultat = [...rezultat, result[0]];
        })
        .catch((err) => console.log(err));
    })
  );
  res.json(rezultat);
});

router.get("/getTestByID/:id", verify, async (req, res) => {
  let trenutniTestZaDodati = "";
  let vecPoceo = false;
  await Test.findById(req.params.id)
    .then((result) => {
      trenutniTestZaDodati = result;
    })
    .catch((err) => res.status(400).json("Error: " + err));

  // Provjera da li student ima predmet za koji radi get request i da li je dobro vrijeme
  if (
    req.user.predmeti.some(
      (e) => e.nazivPredmeta === trenutniTestZaDodati.predmet
    ) &&
    lessThanOneHourAgo(new Date(trenutniTestZaDodati.vrijemeIspita))
  ) {
    let dodijeljeniTest;
    await trenutniTest
      .find({ studentID: req.user.id, predmet: trenutniTestZaDodati.predmet })
      .then((res) => {
        if (res.length > 0) {
          vecPoceo = true;
          dodijeljeniTest = res;
          dodijeljeniTest[0].pitanja.forEach(
            (element) => (element.tacanOdgovor = "")
          );
        }
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
    if (vecPoceo) {
      if (dodijeljeniTest[0].finished) {
        res.status(400).json("Ispit vec oradjen");
        return;
      }
      res.json(dodijeljeniTest[0]);
    } else {
      // Miksanje pitanja za trenutni ispit
      if (trenutniTestZaDodati.posebnoBodovanje) {
        let nizPitanja = [];
        trenutniTestZaDodati.strukturaIspita.map((struct) => {
          let pitanjaSaBodovimaZaDodati = [];
          pitanjaSaBodovimaZaDodati = trenutniTestZaDodati.pitanja.filter(
            (element) => element.brojBodova === struct.brojBodova
          );
          pitanjaSaBodovimaZaDodati = shuffle(pitanjaSaBodovimaZaDodati);
          pitanjaSaBodovimaZaDodati = pitanjaSaBodovimaZaDodati.slice(
            0,
            struct.brojPitanja
          );
          nizPitanja = [...nizPitanja, pitanjaSaBodovimaZaDodati];
        });
        trenutniTestZaDodati.pitanja = [];
        nizPitanja.map((niz) =>
          niz.map(
            (element) =>
              (trenutniTestZaDodati.pitanja = [
                ...trenutniTestZaDodati.pitanja,
                element,
              ])
          )
        );
      } else {
        trenutniTestZaDodati.pitanja = shuffle(trenutniTestZaDodati.pitanja);
        trenutniTestZaDodati.pitanja = trenutniTestZaDodati.pitanja.slice(
          0,
          trenutniTestZaDodati.brojPitanjaNaTestu
        );
      }
      // Podesavanje vremena isteka trenutnog ispita
      let vrijemeIstekaIspita =
        new Date(trenutniTestZaDodati.vrijemeIspita).getTime() + 1000 * 60 * 60;
      trenutniTestZaDodati.vrijemeIspita = new Date(
        trenutniTestZaDodati.vrijemeIspita.getTime()
      );
      vrijemeIstekaIspita = new Date(vrijemeIstekaIspita);

      // Generisanje objekta za snimanje i snimanje u bazu
      const ovoSnimamUBazu = {
        predmet: trenutniTestZaDodati.predmet,
        pitanja: trenutniTestZaDodati.pitanja,
        sadrziSlike: trenutniTestZaDodati.sadrziSlike,
        vrijemeIspita: trenutniTestZaDodati.vrijemeIspita,
        profesor: trenutniTestZaDodati.profesor,
        profesorID: trenutniTestZaDodati.profesorID,
        posebnoBodovanje: trenutniTestZaDodati.posebnoBodovanje,
        strukturaIspita: trenutniTestZaDodati.strukturaIspita,
        brojPitanjaNaTestu: trenutniTestZaDodati.brojPitanjaNaTestu,
        studentID: req.user.id,
        expireAt: vrijemeIstekaIspita,
        finished: false,
      };
      newTest = new trenutniTest(ovoSnimamUBazu);
      newTest
        .save()
        .then(() => {
          ovoSnimamUBazu.pitanja.forEach(
            (element) => (element.tacanOdgovor = "")
          );
          res.json(ovoSnimamUBazu);
        })
        .catch((err) => res.status(400).json("Error" + err));
    }
  } else {
    res.status(400).json("Nemoguce pristupiti ispitu");
  }
});

router.post("/submitTest", verify, async (req, res) => {
  if (req.body.studentID !== req.user.id) {
    res.status(400).json("Pogresan ID studenta");
    return;
  }
  let ispitTest;
  await trenutniTest
    .find({
      studentID: req.user.id,
      predmet: req.body.predmet,
      vrijemeIspita: req.body.vrijemeIspita,
    })
    .then((result) => (ispitTest = result[0]))
    .catch((err) => res.status(400).json("Error " + err));
  if (!ispitTest) {
    res.status(400).json("Greska, ispit je istekao.");
    return;
  }
  if (ispitTest.finished) {
    res.status(400).json("Greska, ispit je vec zavrsen.");
    return;
  }

  // Ocjenjivanje
  let points = 0;
  let ocjena;
  if (!req.body.posebnoBodovanje) {
    const brojBodovaPoPitanju = 100 / ispitTest.brojPitanjaNaTestu;

    req.body.pitanja.forEach((element) => {
      if (
        ispitTest.pitanja.some(
          (pitanje) => JSON.stringify(pitanje) === JSON.stringify(element)
        )
      ) {
        points = points + brojBodovaPoPitanju;
      }
    });
  } else {
    req.body.pitanja.forEach((element) => {
      if (
        ispitTest.pitanja.some(
          (pitanje) => JSON.stringify(pitanje) === JSON.stringify(element)
        )
      ) {
        points = points + element.brojBodova;
      }
    });
  }
  switch (true) {
    case points < 50:
      ocjena = 5;
      break;
    case points >= 50 && points < 60:
      ocjena = 6;
      break;
    case points >= 60 && points < 70:
      ocjena = 7;
      break;
    case points >= 70 && points < 80:
      ocjena = 8;
      break;
    case points >= 80 && points < 90:
      ocjena = 9;
      break;
    case points >= 90:
      ocjena = 10;
      break;
    default:
      res.status(400).json("Greska pri ocjenjivanju");
      return;
  }
  ispitTest.finished = true;
  await trenutniTest
    .replaceOne({ _id: ispitTest._id }, ispitTest)
    .then((result) => {})
    .catch((err) => console.log(err));
  let ocjenaSnimanje1 = {
    predmet: req.body.predmet,
    vrijemeIspita: req.body.vrijemeIspita,
    profesor: req.body.profesor,
    profesorID: req.body.profesorID,
    student: req.body.student,
    studentID: req.body.studentID,
    ocjena,
    brojBodova: points,
  };
  let ocjenaSnimanje = new Grade(ocjenaSnimanje1);
  await ocjenaSnimanje.save().catch((err) => console.log(err));
  if (ocjena > 5) {
    predmetiZaUpdate = req.user.predmeti.filter(
      (element) =>
        JSON.stringify(element) !==
        JSON.stringify({
          nazivPredmeta: ispitTest.predmet,
          profesorID: ispitTest.profesorID,
        })
    );
    await Student.findOneAndUpdate(
      { _id: req.user.id },
      { predmeti: predmetiZaUpdate }
    ).catch((err) => console.log(err));

    const token = jwt.sign(
      {
        username: req.user.username,
        id: req.user.id,
        predmeti: predmetiZaUpdate,
      },
      process.env.SECRET_TOKEN_STUDENT
    );

    res.cookie("JWT-auth-student", token, {
      maxAge: 86400000,
      httpOnly: true,
      secure: true,
    });
  }
  res.json("ok");
});

module.exports = router;
