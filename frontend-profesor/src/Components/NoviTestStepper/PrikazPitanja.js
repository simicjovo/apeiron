import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import "./prikazPitanja.css";

export default function PrikazPitanja(props) {
  const [pitanje, setPitanje] = useState("");
  const [odgovori, setOdgovori] = useState("");
  const [tacanOdgovor, setTacanOdgovor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [brojBodova, setBrojBodova] = useState("");
  useEffect(() => {
    setPitanje(props.pitanje);
    setOdgovori(props.odgovori);
    setTacanOdgovor(props.tacanOdgovor);
    props.posebnoBodovanje && setBrojBodova(props.brojBodova);
  }, []);
  const handleBrisanje = () => {
    const novaPitanja = props.pitanja.filter((element, i) => {
      return i !== props.index;
    });
    props.setPitanja(novaPitanja);
    setIsEditing(false);
  };
  const handleEditing = () => {
    setIsEditing(!isEditing);
  };
  const handlePitanje = (e) => {
    setPitanje(e.target.value);
  };

  const handleTacanOdgovor = (e) => {
    setTacanOdgovor(e.target.value);
  };

  const handleOdgovor = (e, id) => {
    let noviOdgovori = odgovori.slice();
    noviOdgovori[id] = e.target.value;
    setOdgovori(noviOdgovori);
  };
  const handleBodove = (e) => {
    setBrojBodova(e.target.value);
  };
  const handleSave = () => {
    if (
      pitanje &&
      odgovori[0] &&
      odgovori[1] &&
      odgovori[2] &&
      odgovori[3] &&
      tacanOdgovor
    ) {
      const novaPitanja = props.pitanja.slice();
      novaPitanja[props.index].pitanje = pitanje;
      novaPitanja[props.index].odgovori = odgovori;
      novaPitanja[props.index].tacanOdgovor = tacanOdgovor;
      if (props.posebnoBodovanje) {
        novaPitanja[props.index].brojBodova = brojBodova;
      }
      props.setPitanja(novaPitanja);
      setIsEditing(!isEditing);
    } else {
      alert("Greska!");
    }
  };
  if (!isEditing) {
    return (
      <div className="kartica">
        <Card variant="outlined">
          <CardContent style={{ wordWrap: "break-word" }}>
            <Typography variant="h4" align="center" gutterBottom>
              {props.pitanje}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              gutterBottom
              style={
                props.tacanOdgovor === "a"
                  ? { color: "#73cf23", fontWeight: "bold" }
                  : {}
              }
            >
              {props.odgovori[0]}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              gutterBottom
              style={
                props.tacanOdgovor === "b"
                  ? { color: "#73cf23", fontWeight: "bold" }
                  : {}
              }
            >
              {props.odgovori[1]}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              gutterBottom
              style={
                props.tacanOdgovor === "c"
                  ? { color: "#73cf23", fontWeight: "bold" }
                  : {}
              }
            >
              {props.odgovori[2]}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              gutterBottom
              style={
                props.tacanOdgovor === "d"
                  ? { color: "#73cf23", fontWeight: "bold" }
                  : {}
              }
            >
              {props.odgovori[3]}
            </Typography>
            {props.posebnoBodovanje && (
              <Typography style={{ textAlign: "end" }}>
                Broj bodova : {brojBodova}
              </Typography>
            )}
          </CardContent>
          <CardActions style={{ float: "right" }}>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={handleEditing}
              startIcon={<EditIcon></EditIcon>}
            >
              Izmijeni pitanje
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={handleBrisanje}
              startIcon={<DeleteIcon></DeleteIcon>}
            >
              Obrisi pitanje
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="kartica" variant="outlined">
        <Card>
          <CardContent style={{ textAlign: "center" }}>
            <TextField
              autoFocus
              multiline
              label="Pitanje"
              variant="outlined"
              value={pitanje}
              onChange={(e) => handlePitanje(e)}
            />
            <br />
            <div>
              <Radio
                tabIndex="-1"
                checked={tacanOdgovor === "a"}
                name="odgovor"
                value="a"
                onChange={handleTacanOdgovor}
              ></Radio>
              <TextField
                multiline
                label="Odogovor 1"
                value={odgovori[0]}
                onChange={(e) => handleOdgovor(e, 0)}
              />
              <br />
              <Radio
                tabIndex="-1"
                checked={tacanOdgovor === "b"}
                name="odgovor"
                value="b"
                onChange={handleTacanOdgovor}
              ></Radio>
              <TextField
                multiline
                label="Odogovor 2"
                value={odgovori[1]}
                onChange={(e) => handleOdgovor(e, 1)}
              />
              <br />
              <Radio
                tabIndex="-1"
                checked={tacanOdgovor === "c"}
                name="odgovor"
                value="c"
                onChange={handleTacanOdgovor}
              ></Radio>
              <TextField
                multiline
                label="Odogovor 3"
                value={odgovori[2]}
                onChange={(e) => handleOdgovor(e, 2)}
              />
              <br />
              <Radio
                tabIndex="-1"
                checked={tacanOdgovor === "d"}
                name="odgovor"
                value="d"
                onChange={handleTacanOdgovor}
              ></Radio>
              <TextField
                multiline
                label="Odogovor 4"
                value={odgovori[3]}
                onChange={(e) => handleOdgovor(e, 3)}
              />
            </div>
            {props.posebnoBodovanje && (
              <FormControl>
                <InputLabel id="bodovi">Bodovi</InputLabel>
                <Select
                  name="bodovi"
                  labelId="bodovi"
                  value={brojBodova}
                  onChange={handleBodove}
                  style={{ width: "100px" }}
                >
                  {props.strukturaIspita.map((element, index) => (
                    <MenuItem value={element.brojBodova} key={index}>
                      {element.brojBodova}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </CardContent>
          <CardActions style={{ float: "right" }}>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={handleSave}
              startIcon={<SaveIcon></SaveIcon>}
            >
              Snimi izmjene
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={handleBrisanje}
              startIcon={<DeleteIcon></DeleteIcon>}
            >
              Obrisi pitanje
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
