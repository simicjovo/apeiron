const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");

const Test = require("../models/test.model");

router.post("/add", verify, (req, res) => {
  if (req.body.selektovaniPredmet.length < 1) {
    throw new Error("No predmet name");
  }
  if (req.body.pitanja.length < 1) {
    throw new Error("Nema pitanja");
  }
  console.log(req.body);
  predmet = req.body.selektovaniPredmet;
  pitanja = req.body.pitanja;
  sadrziSlike = req.body.sadrziSlike;
  vrijemeIspita = req.body.vrijemeIspita;
  profesor = req.user.username;
  profesorID = req.user.id;
  if (sadrziSlike) {
    req.body.pitanja = JSON.parse(req.body.pitanja);
    req.body.strukturaIspita = JSON.parse(req.body.strukturaIspita);
    req.body.posebnoBodovanje = JSON.parse(req.body.posebnoBodovanje);
  }
  posebnoBodovanje = req.body.posebnoBodovanje;
  posebnoBodovanje
    ? (brojPitanjaNaTestu = 0)
    : (brojPitanjaNaTestu = req.body.brojPitanjaNaTestu);

  pitanja = req.body.pitanja;
  strukturaIspita = req.body.strukturaIspita;

  if (sadrziSlike) {
    for (const property in req.files) {
      if (req.files[property].mimetype === "image/png") {
        let idpitanja = property.slice(0, 13);
        let indekspitanja = property.slice(16);
        pitanja.map((pitanje, i) => {
          if (pitanje.id === parseInt(idpitanja)) {
            pitanje.odgovori.map((odg, index) => {
              if (index === parseInt(indekspitanja)) {
                pitanja[i].odgovori[
                  index
                ] = `${process.env.IMAGE_URL}${property}.png`;
              }
            });
          }
        });
        req.files[property].mv(`./public/images/${property}.png`);
      }
      if (req.files[property].mimetype === "image/jpeg") {
        let idpitanja = property.slice(0, 13);
        let indekspitanja = property.slice(16);
        pitanja.map((pitanje, i) => {
          if (pitanje.id === parseInt(idpitanja)) {
            pitanje.odgovori.map((odg, index) => {
              if (index === parseInt(indekspitanja)) {
                pitanja[i].odgovori[
                  index
                ] = `${process.env.IMAGE_URL}${property}.jpeg`;
              }
            });
          }
        });
        req.files[property].mv(`./public/images/${property}.jpeg`);
      }
    }
  }

  Test.find({ profesorID: req.user.id, predmet })
    .then((result) => {
      if (result.length > 0) {
        res.status(400).json("Ispit vec postoji");
      } else {
        newTest = new Test({
          predmet,
          pitanja,
          sadrziSlike,
          vrijemeIspita,
          profesor,
          profesorID,
          posebnoBodovanje,
          strukturaIspita,
          brojPitanjaNaTestu,
        });
        newTest
          .save()
          .then(() => res.json("Test uspjesno snimljen."))
          .catch((err) => res.status(400).json("Error" + err));
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/get", verify, (req, res) => {
  Test.find({ profesorID: req.user.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/getById/:id", verify, (req, res) => {
  Test.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/deleteTestById/:id", verify, (req, res) => {
  Test.deleteOne({ _id: req.params.id })
    .then(() => res.json("User deleted succesfuly."))
    .catch((err) => res.status(400).json("Error: ", err));
});

router.put("/submitEditByID/:id", verify, (req, res) => {
  console.log(req.body);
  if (req.body.predmet.length < 1) {
    throw new Error("No predmet name");
  }
  if (req.body.pitanja.length < 1) {
    throw new Error("Nema pitanja");
  }
  predmet = req.body.predmet;
  pitanja = req.body.pitanja;
  sadrziSlike = req.body.sadrziSlike;
  vrijemeIspita = req.body.vrijemeIspita;
  profesor = req.user.username;
  profesorID = req.user.id;
  posebnoBodovanje = req.body.posebnoBodovanje;

  if (sadrziSlike) {
    req.body.pitanja = JSON.parse(req.body.pitanja);
    req.body.strukturaIspita = JSON.parse(req.body.strukturaIspita);
  }
  pitanja = req.body.pitanja;
  strukturaIspita = req.body.strukturaIspita;

  if (sadrziSlike) {
    for (const property in req.files) {
      if (req.files[property].mimetype === "image/png") {
        let idpitanja = property.slice(0, 13);
        let indekspitanja = property.slice(16);
        pitanja.map((pitanje, i) => {
          if (pitanje.id === parseInt(idpitanja)) {
            pitanje.odgovori.map((odg, index) => {
              if (index === parseInt(indekspitanja)) {
                pitanja[i].odgovori[
                  index
                ] = `${process.env.IMAGE_URL}${property}.png`;
              }
            });
          }
        });
        req.files[property].mv(`./public/images/${property}.png`);
      }
      if (req.files[property].mimetype === "image/jpeg") {
        let idpitanja = property.slice(0, 13);
        let indekspitanja = property.slice(16);
        pitanja.map((pitanje, i) => {
          if (pitanje.id === parseInt(idpitanja)) {
            pitanje.odgovori.map((odg, index) => {
              if (index === parseInt(indekspitanja)) {
                pitanja[i].odgovori[
                  index
                ] = `${process.env.IMAGE_URL}${property}.jpeg`;
              }
            });
          }
        });
        req.files[property].mv(`./public/images/${property}.jpeg`);
      }
    }
  }
  Test.replaceOne(
    { _id: req.params.id },
    {
      predmet,
      pitanja,
      sadrziSlike,
      vrijemeIspita,
      profesor,
      profesorID,
      posebnoBodovanje,
      strukturaIspita,
    }
  )
    .then(() => res.json("Uspjesna izmjena"))
    .catch((err) => res.status(400).json("Greska: " + err));
});

module.exports = router;
