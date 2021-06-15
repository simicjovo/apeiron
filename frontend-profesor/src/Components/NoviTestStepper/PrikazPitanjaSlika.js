import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ImageZoom from "react-medium-image-zoom";
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
  const [tacanOdgovor, setTacanOdgovor] = useState("");
  const [brojBodova, setBrojBodova] = useState("");
  const [slike, setSlike] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    setPitanje(props.pitanje);
    setTacanOdgovor(props.tacanOdgovor);
    props.posebnoBodovanje && setBrojBodova(props.brojBodova);
    if (
      props.testPreview &&
      (typeof props.odgovori[0] !== "object" ||
        typeof props.odgovori[1] !== "object" ||
        typeof props.odgovori[2] !== "object" ||
        typeof props.odgovori[3] !== "object")
    ) {
      setSlike(props.odgovori);
      return;
    }
    const urlovi = props.odgovori.map((odgovor) => {
      const objectUrl = URL.createObjectURL(odgovor);
      return objectUrl;
    });
    setSlike(urlovi);
  }, []);
  const handleBrisanje = () => {
    const novaPitanja = props.pitanja.filter((element, i) => {
      return i !== props.index;
    });
    props.setPitanja(novaPitanja);
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

  const handleBodove = (e) => {
    setBrojBodova(e.target.value);
  };

  const handleSave = () => {
    if (
      pitanje &&
      props.odgovori[0] &&
      props.odgovori[1] &&
      props.odgovori[2] &&
      props.odgovori[3] &&
      tacanOdgovor
    ) {
      const novaPitanja = props.pitanja.slice();
      novaPitanja[props.index].pitanje = pitanje;
      novaPitanja[props.index].odgovori = props.odgovori;
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
            <div
              style={{
                textAlign: "center",
                marginLeft: props.tacanOdgovor === "a" ? "20px" : "0",
              }}
            >
              <ImageZoom
                image={{
                  src: slike[0],
                  alt: "Odg 1",
                  style: { width: "100px", height: "100px" },
                }}
                zoomImage={{ src: slike[0], alt: "Odg 1" }}
              ></ImageZoom>
              {/* <img src={slike[0]} alt="" style={{ width: "150px" }}></img> */}
              {props.tacanOdgovor === "a" && (
                <img
                  src="http://localhost:3001/correct.png"
                  alt=""
                  style={{
                    width: "20px",
                    maringLeft: "5px",
                    marginBottom: "35px",
                  }}
                ></img>
              )}
            </div>
            <br></br>
            <div
              style={{
                textAlign: "center",
                marginLeft: props.tacanOdgovor === "b" ? "20px" : "0",
              }}
            >
              <ImageZoom
                image={{
                  src: slike[1],
                  alt: "Odg 2",
                  style: { width: "100px", height: "100px" },
                }}
                zoomImage={{ src: slike[1], alt: "Odg 2" }}
              ></ImageZoom>
              {props.tacanOdgovor === "b" && (
                <img
                  src="http://localhost:3001/correct.png"
                  alt=""
                  style={{
                    width: "20px",
                    maringLeft: "5px",
                    marginBottom: "35px",
                  }}
                ></img>
              )}
            </div>
            <br></br>
            <div
              style={{
                textAlign: "center",
                marginLeft: props.tacanOdgovor === "c" ? "20px" : "0",
              }}
            >
              <ImageZoom
                image={{
                  src: slike[2],
                  alt: "Odg 3",
                  style: { width: "100px", height: "100px" },
                }}
                zoomImage={{ src: slike[2], alt: "Odg 3" }}
              ></ImageZoom>
              {props.tacanOdgovor === "c" && (
                <img
                  src="http://localhost:3001/correct.png"
                  alt=""
                  style={{
                    width: "20px",
                    maringLeft: "5px",
                    marginBottom: "35px",
                  }}
                ></img>
              )}
            </div>
            <br></br>
            <div
              style={{
                textAlign: "center",
                marginLeft: props.tacanOdgovor === "d" ? "20px" : "0",
              }}
            >
              <ImageZoom
                image={{
                  src: slike[3],
                  alt: "Odg 4",
                  style: { width: "100px", height: "100px" },
                }}
                zoomImage={{ src: slike[3], alt: "Odg 4" }}
              ></ImageZoom>
              {props.tacanOdgovor === "d" && (
                <img
                  src="http://localhost:3001/correct.png"
                  alt=""
                  style={{
                    width: "20px",
                    maringLeft: "5px",
                    marginBottom: "35px",
                  }}
                ></img>
              )}
            </div>
            <br></br>
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
              <ImageZoom
                image={{
                  src: slike[0],
                  alt: "Odg 1",
                  style: { width: "100px", height: "100px" },
                }}
                zoomImage={{ src: slike[0], alt: "Odg 1" }}
              ></ImageZoom>
              <br />
              <Radio
                tabIndex="-1"
                checked={tacanOdgovor === "b"}
                name="odgovor"
                value="b"
                onChange={handleTacanOdgovor}
              ></Radio>
              <ImageZoom
                image={{
                  src: slike[1],
                  alt: "Odg 2",
                  style: { width: "100px", height: "100px" },
                }}
                zoomImage={{ src: slike[1], alt: "Odg 1" }}
              ></ImageZoom>
              <br />
              <Radio
                tabIndex="-1"
                checked={tacanOdgovor === "c"}
                name="odgovor"
                value="c"
                onChange={handleTacanOdgovor}
              ></Radio>
              <ImageZoom
                image={{
                  src: slike[2],
                  alt: "Odg 3",
                  style: { width: "100px", height: "100px" },
                }}
                zoomImage={{ src: slike[2], alt: "Odg 1" }}
              ></ImageZoom>
              <br />
              <Radio
                tabIndex="-1"
                checked={tacanOdgovor === "d"}
                name="odgovor"
                value="d"
                onChange={handleTacanOdgovor}
              ></Radio>
              <ImageZoom
                image={{
                  src: slike[3],
                  alt: "Odg 4",
                  style: { width: "100px", height: "100px" },
                }}
                zoomImage={{ src: slike[3], alt: "Odg 1" }}
              ></ImageZoom>
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
