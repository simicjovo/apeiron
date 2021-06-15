import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function NovoPitanje(props) {
  const [pitanje, setPitanje] = useState("");
  const [odgovori, setOdgovori] = useState(["", "", "", ""]);
  const [tacanOdgovor, setTacanOdgovor] = useState("");
  const [selektovaniBrojBodova, setSelektovaniBrojBodova] = useState("");
  const [pitanjeImaSlike, setPitanjeImaSlike] = useState(false);

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

  const handleSubmit = () => {
    if (
      pitanje &&
      odgovori[0] &&
      odgovori[1] &&
      odgovori[2] &&
      odgovori[3] &&
      tacanOdgovor
    ) {
      if (props.posebnoBodovanje && !selektovaniBrojBodova) {
        alert("Izaberite broj bodova");
        return;
      }
      if (props.posebnoBodovanje) {
        props.setPitanja([
          ...props.pitanja,
          {
            pitanje,
            odgovori,
            tacanOdgovor,
            id: new Date().getTime(),
            brojBodova: selektovaniBrojBodova,
            pitanjeImaSlike,
          },
        ]);
      } else {
        props.setPitanja([
          ...props.pitanja,
          {
            pitanje,
            odgovori,
            tacanOdgovor,
            pitanjeImaSlike,
            id: new Date().getTime(),
          },
        ]);
      }
      setPitanje("");
      setOdgovori(["", "", "", ""]);
      setTacanOdgovor("");
      setSelektovaniBrojBodova("");
      setPitanjeImaSlike(false);
    } else {
      alert("Greska");
    }
  };
  const handleBodove = (e) => {
    setSelektovaniBrojBodova(e.target.value);
  };
  const handlePitanjeImaSlike = () => {
    setOdgovori(["", "", "", ""]);
    setPitanjeImaSlike(!pitanjeImaSlike);
  };
  const handleUpload = (e, id) => {
    let noviOdgovori = odgovori.slice();
    noviOdgovori[id] = e.target.files[0];
    setOdgovori(noviOdgovori);
    console.log(e.target.files[0]);
  };

  return (
    <div>
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
        {pitanjeImaSlike ? (
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => handleUpload(e, 0)}
          ></input>
        ) : (
          <TextField
            multiline
            label="Odogovor 1"
            value={odgovori[0]}
            onChange={(e) => handleOdgovor(e, 0)}
          />
        )}
        <br />
        <Radio
          tabIndex="-1"
          checked={tacanOdgovor === "b"}
          name="odgovor"
          value="b"
          onChange={handleTacanOdgovor}
        ></Radio>
        {pitanjeImaSlike ? (
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => handleUpload(e, 1)}
          ></input>
        ) : (
          <TextField
            multiline
            label="Odogovor 2"
            value={odgovori[1]}
            onChange={(e) => handleOdgovor(e, 1)}
          />
        )}
        <br />
        <Radio
          tabIndex="-1"
          checked={tacanOdgovor === "c"}
          name="odgovor"
          value="c"
          onChange={handleTacanOdgovor}
        ></Radio>
        {pitanjeImaSlike ? (
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => handleUpload(e, 2)}
          ></input>
        ) : (
          <TextField
            multiline
            label="Odogovor 3"
            value={odgovori[2]}
            onChange={(e) => handleOdgovor(e, 2)}
          />
        )}
        <br />
        <Radio
          tabIndex="-1"
          checked={tacanOdgovor === "d"}
          name="odgovor"
          value="d"
          onChange={handleTacanOdgovor}
        ></Radio>
        {pitanjeImaSlike ? (
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => handleUpload(e, 3)}
          ></input>
        ) : (
          <TextField
            multiline
            label="Odogovor 4"
            value={odgovori[3]}
            onChange={(e) => handleOdgovor(e, 3)}
          />
        )}
        {props.sadrziSlike && (
          <div style={{ textAlign: "right" }}>
            <br />
            Pitanje sadrzi slike?
            <Checkbox
              checked={pitanjeImaSlike}
              onChange={handlePitanjeImaSlike}
              color="primary"
            ></Checkbox>
            <br />
          </div>
        )}
      </div>
      <br />
      {props.posebnoBodovanje && (
        <FormControl>
          <InputLabel id="bodovi">Bodovi</InputLabel>
          <Select
            name="bodovi"
            labelId="bodovi"
            value={selektovaniBrojBodova}
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
      <Button
        variant="contained"
        style={{ float: "right", backgroundColor: "#4caf50", color: "#fff" }}
        onClick={handleSubmit}
      >
        Dodaj pitanje
      </Button>
    </div>
  );
}
