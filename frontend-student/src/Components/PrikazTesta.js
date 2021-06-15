import React, { useState, useEffect } from "react";
import PrikazPitanja from "./PrikazPitanja";
import PrikazPitanjaSlika from "./PrikazPitanjaSlika";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function PrikazTesta(props) {
  const [test, setTest] = useState();
  const [open, setOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleClickOpen = () => {
    let notFinished = false;
    test.pitanja.forEach((element) => {
      if (!element.tacanOdgovor) {
        notFinished = true;
      }
    });
    if (notFinished) {
      alert("Niste uradili sva pitanja");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    let notFinished = false;
    test.pitanja.forEach((element) => {
      if (!element.tacanOdgovor) {
        notFinished = true;
      }
    });
    if (notFinished) {
      alert("Niste uradili sva pitanja");
      return;
    }
    await axios
      .post("/student/tests/submitTest", test)
      .then((res) => alert("uspjeh"))
      .catch((err) => console.log(err));
    setOpen(false);
    setIsFinished(true);
  };

  useEffect(() => {
    axios
      .get(`/student/tests/getTestByID/${props.match.params.id}`)
      .then((res) => setTest(res.data))
      .catch((err) => console.log(err));
  }, [props.match.params.id]);
  let renderPitanja = "";
  if (test) {
    renderPitanja = test.pitanja.map((element, index) => {
      return !element.pitanjeImaSlike ? (
        <div key={element.id}>
          <PrikazPitanja
            pitanje={element.pitanje}
            odgovori={element.odgovori}
            brojBodova={test.posebnoBodovanje ? element.brojBodova : undefined}
            posebnoBodovanje={test.posebnoBodovanje}
            test={test}
            setTest={setTest}
            index={index}
          ></PrikazPitanja>
        </div>
      ) : (
        <div key={element.id}>
          <PrikazPitanjaSlika
            pitanje={element.pitanje}
            odgovori={element.odgovori}
            brojBodova={test.posebnoBodovanje ? element.brojBodova : undefined}
            posebnoBodovanje={test.posebnoBodovanje}
            test={test}
            setTest={setTest}
            index={index}
          ></PrikazPitanjaSlika>
        </div>
      );
    });
  }
  return (
    <div>
      <div
        style={{ marginTop: "20px", textAlign: "center", marginBottom: "20px" }}
      >
        {test ? <h1>{test.predmet}</h1> : ""}
      </div>
      {renderPitanja}
      <div style={{ height: "100px" }}></div>
      {test && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            textAlign: "right",
            bottom: "10px",
          }}
        >
          <Button
            style={{ marginRight: "20px" }}
            color="primary"
            variant="contained"
            onClick={handleClickOpen}
          >
            Zavrsi Ispit
          </Button>
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Da li ste sigurni da zelite zavrsiti test?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ovo je konacna odluka i ne mozete da ju promijenite.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ne
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Da
          </Button>
        </DialogActions>
      </Dialog>
      {isFinished && <Redirect to="/"></Redirect>}
    </div>
  );
}
