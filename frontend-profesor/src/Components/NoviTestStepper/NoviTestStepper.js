import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Postavke from "./Postavke";
import GenerisanjePitanja from "./GenerisanjePitanja";
import Potvrda from "./Potvrda";
import { Link } from "react-router-dom";
import axios from "axios";
import "./noviTestStepper.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Osnovne postavke", "Generisanje pitanja", "Potvrda"];
}

export default function NoviTestStepper() {
  const classes = useStyles();
  const [selektovaniPredmet, setSelektovaniPredmet] = useState("");
  const [sadrziSlike, setSadrziSlike] = useState(false);
  const [vrijemeIspita, setVrijemeIspita] = useState(new Date().getTime());
  const [pitanja, setPitanja] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [predmeti, setPredmeti] = useState([]);
  const [posebnoBodovanje, setPosebnoBodovanje] = useState(false);
  const [brojPitanjaNaTestu, setBrojPitanjaNaTestu] = useState();
  const [strukturaIspita, setStrukturaIspita] = useState([
    { brojBodova: 0, brojPitanja: 0 },
  ]);
  const ukupanBrojBodovaNiz = strukturaIspita.map(
    (element) => element.brojBodova * element.brojPitanja
  );
  const ukupanBrojBodova = ukupanBrojBodovaNiz.reduce((pv, cv) => pv + cv, 0);
  const steps = getSteps();

  useEffect(() => {
    let sviPredmeti = [];
    axios
      .get("/tests/get")
      .then((ress) => {
        axios
          .get("/login/check")
          .then((res) => {
            sviPredmeti = res.data.predmeti;
            const nedostupniPredmeti = ress.data.map((ispit) => ispit.predmet);
            const moguciPredmeti = sviPredmeti.filter(
              (predmet) => !nedostupniPredmeti.includes(predmet)
            );
            setPredmeti(moguciPredmeti);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Postavke
            predmeti={predmeti}
            selektovaniPredmet={selektovaniPredmet}
            setSelektovaniPredmet={setSelektovaniPredmet}
            sadrziSlike={sadrziSlike}
            setSadrziSlike={setSadrziSlike}
            vrijemeIspita={vrijemeIspita}
            setVrijemeIspita={setVrijemeIspita}
            posebnoBodovanje={posebnoBodovanje}
            setPosebnoBodovanje={setPosebnoBodovanje}
            strukturaIspita={strukturaIspita}
            setStrukturaIspita={setStrukturaIspita}
            ukupanBrojBodova={ukupanBrojBodova}
            brojPitanjaNaTestu={brojPitanjaNaTestu}
            setBrojPitanjaNaTestu={setBrojPitanjaNaTestu}
          ></Postavke>
        );
      case 1:
        return (
          <GenerisanjePitanja
            pitanja={pitanja}
            setPitanja={setPitanja}
            posebnoBodovanje={posebnoBodovanje}
            strukturaIspita={strukturaIspita}
            sadrziSlike={sadrziSlike}
          ></GenerisanjePitanja>
        );
      case 2:
        return (
          <Potvrda
            pitanja={pitanja}
            setPitanja={setPitanja}
            selektovaniPredmet={selektovaniPredmet}
            vrijemeIspita={vrijemeIspita}
            posebnoBodovanje={posebnoBodovanje}
            strukturaIspita={strukturaIspita}
          ></Potvrda>
        );
      default:
        return "Unknown step";
    }
  }
  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === 0 && !selektovaniPredmet) {
      alert("Predmet nije selektovan");
      return;
    }
    if (activeStep === 0 && !posebnoBodovanje && !brojPitanjaNaTestu) {
      alert("Nije selektovan broj pitanja na studentovom ispitu");
      return;
    }
    if (activeStep === 0 && posebnoBodovanje && ukupanBrojBodova !== 100) {
      alert("Ispit ne sadrzi 100 bodova");
      return;
    }

    if (activeStep === 1 && posebnoBodovanje) {
      const hasMistakes = pitanja.filter(
        (element) => element.brojBodova === undefined
      );
      if (hasMistakes.length > 0) {
        alert(`Pitanje ${hasMistakes[0].pitanje} nema broj bodova.`);
        return;
      }
    }
    if (activeStep === 1 && posebnoBodovanje) {
      let hasEnoughQuestions = strukturaIspita.map((element) => {
        let questionsWithThesePoints = pitanja.filter(
          (pitanje) => pitanje.brojBodova === element.brojBodova
        );
        if (questionsWithThesePoints.length < element.brojPitanja) {
          alert(`Nedovoljno pitanja od ${element.brojBodova} bodova`);
          return false;
        } else {
          return true;
        }
      });
      if (hasEnoughQuestions.includes(false)) {
        return;
      }
    }
    if (
      (activeStep === 1 || activeStep === 2) &&
      !posebnoBodovanje &&
      pitanja.length < brojPitanjaNaTestu
    ) {
      alert("Nedovoljno pitanja");
      return;
    }
    if (activeStep === 2 && posebnoBodovanje) {
      const hasMistakes = pitanja.filter(
        (element) => element.brojBodova === undefined
      );
      if (hasMistakes.length > 0) {
        alert(`Pitanje ${hasMistakes[0].pitanje} nema broj bodova.`);
        return;
      }
    }

    if (activeStep === 2 && posebnoBodovanje) {
      let hasEnoughQuestions = strukturaIspita.map((element) => {
        let questionsWithThesePoints = pitanja.filter(
          (pitanje) => pitanje.brojBodova === element.brojBodova
        );
        if (questionsWithThesePoints.length < element.brojPitanja) {
          alert(`Nedovoljno pitanja od ${element.brojBodova} bodova`);
          return false;
        } else {
          return true;
        }
      });
      if (hasEnoughQuestions.includes(false)) {
        return;
      }
    }
    if (activeStep === 2) {
      let vrijemeIspitaNovo = new Date(vrijemeIspita);
      vrijemeIspitaNovo.setSeconds(0, 0);

      if (sadrziSlike) {
        let formData = new FormData();
        pitanja.map((pitanje) => {
          if (pitanje.pitanjeImaSlike) {
            pitanje.odgovori.map((odgovor, index) => {
              formData.append(`${pitanje.id}odg${index}`, odgovor);
            });
          }
        });
        formData.append("selektovaniPredmet", selektovaniPredmet);
        formData.append("sadrziSlike", sadrziSlike);
        formData.append("vrijemeIspita", vrijemeIspitaNovo);
        formData.append("pitanja", JSON.stringify(pitanja));
        formData.append("posebnoBodovanje", posebnoBodovanje);
        formData.append("strukturaIspita", JSON.stringify(strukturaIspita));
        formData.append("brojPitanjaNaTestu", brojPitanjaNaTestu);
        axios
          .post("/tests/add", formData)
          .then((res) => console.log(res))
          .catch((err) => {
            alert("Greska");
            setActiveStep(0);
          });
      } else {
        axios
          .post("/tests/add", {
            selektovaniPredmet,
            sadrziSlike,
            vrijemeIspita: vrijemeIspitaNovo,
            pitanja,
            posebnoBodovanje,
            strukturaIspita,
            brojPitanjaNaTestu,
          })
          .then((res) => console.log(res))
          .catch((err) => {
            alert("Greska");
            setActiveStep(0);
          });
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} style={{ backgroundColor: "#f5f5f5" }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Link to="/" style={{ color: "#FFF", textDecoration: "none" }}>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
              >
                Nazad na pocetnu
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions} component={"span"}>
              {getStepContent(activeStep)}
            </Typography>
            <div className="dockedBottom">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Nazad
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Zavrsi" : "Dalje"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
