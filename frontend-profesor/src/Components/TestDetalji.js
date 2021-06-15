import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import PrikazPitanja from "./NoviTestStepper/PrikazPitanja";
import PrikazPitanjaSlika from "./NoviTestStepper/PrikazPitanjaSlika";
import GenerisanjePitanja from "./NoviTestStepper/GenerisanjePitanja";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./testDetalji.css";
import Typography from "@material-ui/core/Typography";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function TestDetalji(props) {
  const [thisTest, setThisTest] = useState("");
  const [thisTestPitanja, setThisTestPitanja] = useState([]);
  const [isAddingQuestions, setIsAddingQuestions] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  useEffect(() => {
    const getTestByID = () => {
      axios
        .get(`/tests/getById/${props.match.params.id}`)
        .then((data) => {
          setThisTest(data.data);
          setThisTestPitanja(data.data.pitanja);
          setIsLoading(false);
        })
        .catch((err) => {
          setThisTest(null);
        });
    };
    getTestByID();
  }, [props.match.params.id]);

  useEffect(() => {
    setThisTest({ ...thisTest, pitanja: thisTestPitanja });
  }, [thisTestPitanja]);

  const handleDateChange = (date) => {
    setThisTest({ ...thisTest, vrijemeIspita: date });
  };

  const handleDeleteTest = () => {
    axios
      .delete(`/tests/deleteTestById/${props.match.params.id}`)
      .then(() => window.history.back())
      .catch((err) => console.log(err));
    handleCloseDelete();
  };

  const handleSubmitEdit = () => {
    let hasEnoughQuestions = thisTest.strukturaIspita.map((element) => {
      let questionsWithThesePoints = thisTest.pitanja.filter(
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
      handleCloseEdit();
      return;
    }
    if (thisTest.sadrziSlike) {
      let formData = new FormData();
      thisTest.pitanja.map((pitanje) => {
        if (
          pitanje.pitanjeImaSlike &&
          typeof pitanje.odgovori[0] !== "string"
        ) {
          pitanje.odgovori.map((odgovor, index) => {
            formData.append(`${pitanje.id}odg${index}`, odgovor);
          });
        }
      });
      formData.append("predmet", thisTest.predmet);
      formData.append("sadrziSlike", thisTest.sadrziSlike);
      formData.append("vrijemeIspita", thisTest.vrijemeIspita);
      formData.append("pitanja", JSON.stringify(thisTest.pitanja));
      formData.append("posebnoBodovanje", thisTest.posebnoBodovanje);
      formData.append(
        "strukturaIspita",
        JSON.stringify(thisTest.strukturaIspita)
      );
      axios
        .put(`/tests/submitEditByID/${props.match.params.id}`, formData)
        .then((res) => console.log(res))
        .catch((err) => {
          alert("Greska");
        });
    } else {
      axios
        .put(`/tests/submitEditByID/${props.match.params.id}`, thisTest)
        .then(() => alert("Uspjeh"))
        .catch(() => alert("Greska"));
    }
    handleCloseEdit();
  };
  const handleAddPreview = () => {
    setIsAddingQuestions(!isAddingQuestions);
  };

  const timestamp2 = thisTest.vrijemeIspita;
  const time = new Date(timestamp2).toLocaleTimeString("it-IT");
  const date = new Date(timestamp2).toLocaleDateString("it-IT");
  if (isLoading) {
    return (
      <CircularProgress
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      ></CircularProgress>
    );
  }
  if (thisTest === null) {
    return <div>Pogresan ID</div>;
  } else if (!isAddingQuestions) {
    const renderPitanja = thisTestPitanja.map((pitanje, index) => (
      <div key={pitanje.id} style={{ marginBottom: "20px" }}>
        {!pitanje.pitanjeImaSlike ? (
          <PrikazPitanja
            pitanje={pitanje.pitanje}
            odgovori={pitanje.odgovori}
            tacanOdgovor={pitanje.tacanOdgovor}
            pitanja={thisTestPitanja}
            setPitanja={setThisTestPitanja}
            index={index}
            posebnoBodovanje={thisTest.posebnoBodovanje}
            brojBodova={
              thisTest.posebnoBodovanje ? pitanje.brojBodova : undefined
            }
            strukturaIspita={thisTest.strukturaIspita}
          ></PrikazPitanja>
        ) : (
          <PrikazPitanjaSlika
            pitanje={pitanje.pitanje}
            odgovori={pitanje.odgovori}
            tacanOdgovor={pitanje.tacanOdgovor}
            pitanja={thisTestPitanja}
            setPitanja={setThisTestPitanja}
            index={index}
            posebnoBodovanje={thisTest.posebnoBodovanje}
            brojBodova={
              thisTest.posebnoBodovanje ? pitanje.brojBodova : undefined
            }
            strukturaIspita={thisTest.strukturaIspita}
            testPreview={true}
          ></PrikazPitanjaSlika>
        )}
      </div>
    ));
    return (
      <div>
        <Typography variant="h2" style={{ textAlign: "center" }}>
          {thisTest.predmet}
        </Typography>
        <div style={{ textAlign: "center" }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Datum ispita"
              format="dd/MM/yyyy"
              value={thisTest.vrijemeIspita}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <br></br>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Vrijeme ispita"
              value={thisTest.vrijemeIspita}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        {renderPitanja}
        <div style={{ height: "100px" }}></div>
        <div className="dugmad">
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handleClickOpenDelete()}
            startIcon={<DeleteIcon></DeleteIcon>}
          >
            Obrisi
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleClickOpenEdit()}
            startIcon={<SaveIcon></SaveIcon>}
          >
            Snimi
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleAddPreview}
            startIcon={<AddIcon></AddIcon>}
          >
            Dodaj pitanja
          </Button>
        </div>
        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Brisanje testa"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Da li ste sigurni da zelite obrisati ovaj test?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="primary">
              Ne
            </Button>
            <Button onClick={handleDeleteTest} color="primary" autoFocus>
              Da
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Snimi izmjene"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Da li ste sigurni da zelite snimiti izmjene na ovom testu?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} color="primary">
              Ne
            </Button>
            <Button onClick={handleSubmitEdit} color="primary" autoFocus>
              Da
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else if (isAddingQuestions) {
    return (
      <div style={{ paddingTop: "64px" }}>
        <GenerisanjePitanja
          pitanja={thisTestPitanja}
          setPitanja={setThisTestPitanja}
          posebnoBodovanje={thisTest.posebnoBodovanje}
          strukturaIspita={thisTest.strukturaIspita}
          sadrziSlike={thisTest.sadrziSlike}
          testPreview={true}
        ></GenerisanjePitanja>
        <div className="dugmad">
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handleClickOpenDelete()}
            startIcon={<DeleteIcon></DeleteIcon>}
          >
            Obrisi
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleClickOpenEdit()}
            startIcon={<SaveIcon></SaveIcon>}
          >
            Snimi
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleAddPreview}
            startIcon={<VisibilityIcon></VisibilityIcon>}
          >
            Pregledaj
          </Button>
        </div>
        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Brisanje testa"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Da li ste sigurni da zelite obrisati ovaj test?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="primary">
              Ne
            </Button>
            <Button onClick={handleDeleteTest} color="primary" autoFocus>
              Da
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Snimi izmjene"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Da li ste sigurni da zelite snimiti izmjene na ovom testu?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} color="primary">
              Ne
            </Button>
            <Button onClick={handleSubmitEdit} color="primary" autoFocus>
              Da
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
