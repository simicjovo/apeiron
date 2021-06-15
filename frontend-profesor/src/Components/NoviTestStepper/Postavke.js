import React from "react";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "./postavke.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Postavke(props) {
  const classes = useStyles();

  const handleDateChange = (date) => {
    props.setVrijemeIspita(date);
  };
  const handlePredmetChange = (e) => {
    props.setSelektovaniPredmet(e.target.value);
  };
  const handleSlike = () => {
    props.setSadrziSlike(!props.sadrziSlike);
  };
  const handlePosebnoBodovanje = () => {
    props.setPosebnoBodovanje(!props.posebnoBodovanje);
  };
  const handleBrojBodovaChange = (e, index) => {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
    let newElement = props.strukturaIspita[index];
    newElement.brojBodova = e.target.value;
    let noviNiz = props.strukturaIspita.slice();
    noviNiz[index] = newElement;
    props.setStrukturaIspita(noviNiz);
  };
  const handleBrojPitanjaChange = (e, index) => {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
    let newElement = props.strukturaIspita[index];
    newElement.brojPitanja = e.target.value;
    let noviNiz = props.strukturaIspita.slice();
    noviNiz[index] = newElement;
    props.setStrukturaIspita(noviNiz);
  };
  const handleAddNewLine = () => {
    props.setStrukturaIspita([
      ...props.strukturaIspita,
      { brojBodova: 0, brojPitanja: 0 },
    ]);
  };
  const handleDeleteLine = (index) => {
    const noviNiz = props.strukturaIspita.filter((element, i) => i !== index);
    props.setStrukturaIspita(noviNiz);
  };
  const handleBrojPitanjaNaIspitu = (e) => {
    if (e.target.value < 1) {
      e.target.value = 1;
    }
    props.setBrojPitanjaNaTestu(e.target.value);
  };
  const renderStrukturaBodovanja = props.strukturaIspita.map(
    (element, index) => {
      return (
        <React.Fragment key={index}>
          <TextField
            label="Broj bodova"
            type="number"
            value={element.brojBodova}
            onChange={(e) => handleBrojBodovaChange(e, index)}
          ></TextField>
          <TextField
            style={{ marginLeft: "40px" }}
            label="Kolicina pitanja"
            type="number"
            value={element.brojPitanja}
            onChange={(e) => handleBrojPitanjaChange(e, index)}
          ></TextField>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginLeft: "10px" }}
            onClick={() => handleDeleteLine(index)}
          >
            Obrisi liniju
          </Button>
          <br></br>
        </React.Fragment>
      );
    }
  );

  return (
    <div className="postavke">
      <FormControl className={classes.formControl} required>
        <InputLabel id="izaberi-predmet">Predmet: </InputLabel>
        <Select
          name="predmeti"
          labelId="izaberi-predmet"
          value={props.selektovaniPredmet}
          onChange={handlePredmetChange}
        >
          <MenuItem value="" disabled>
            Vasi predmeti
          </MenuItem>
          {props.predmeti.map((predmet, i) => (
            <MenuItem value={predmet} key={i}>
              {predmet}
            </MenuItem>
          ))}
        </Select>
        <FormControlLabel
          style={{ paddingTop: "0.8em" }}
          control={
            <Checkbox
              checked={props.sadrziSlike}
              onChange={handleSlike}
              color="primary"
            ></Checkbox>
          }
          label="Test sadrzi slike"
        ></FormControlLabel>
        <br></br>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Datum ispita"
            format="dd/MM/yyyy"
            value={props.vrijemeIspita}
            onChange={handleDateChange}
            disablePast
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <br></br>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Vrijeme ispita"
            value={props.vrijemeIspita}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </MuiPickersUtilsProvider>

        <FormControlLabel
          style={{ paddingTop: "0.8em" }}
          control={
            <Checkbox
              checked={props.posebnoBodovanje}
              onChange={handlePosebnoBodovanje}
              color="primary"
            ></Checkbox>
          }
          label="Posebno bodovanje"
        ></FormControlLabel>
        {!props.posebnoBodovanje ? (
          <TextField
            label="Broj pitanja po testu"
            type="number"
            value={props.brojPitanjaNaTestu}
            onChange={(e) => handleBrojPitanjaNaIspitu(e)}
          ></TextField>
        ) : null}
      </FormControl>
      {props.posebnoBodovanje && (
        <div style={{ width: "50%", marginLeft: "25%" }}>
          <Typography variant="h5" gutterBottom>
            Struktura ispita
          </Typography>
          <Typography variant="h6" gutterBottom>
            Ukupan broj bodova:{" "}
            <span
              style={{
                color: props.ukupanBrojBodova !== 100 ? "red" : "green",
              }}
            >
              {props.ukupanBrojBodova}
            </span>{" "}
            (Obavezno 100)
          </Typography>
          {renderStrukturaBodovanja}
          <Button
            style={{ marginTop: "20px" }}
            variant="contained"
            color="primary"
            onClick={handleAddNewLine}
          >
            Nova linija
          </Button>
        </div>
      )}
      <div style={{ height: "100px" }}></div>
    </div>
  );
}
