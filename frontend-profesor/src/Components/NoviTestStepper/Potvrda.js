import React from "react";
import PrikazPitanja from "./PrikazPitanja";
import PrikazPitanjaSlika from "./PrikazPitanjaSlika";
import Typography from "@material-ui/core/Typography";

export default function Potvrda(props) {
  const prikaziSvaPitanja = props.pitanja.map((trenutnoPitanje, index) => {
    if (trenutnoPitanje.pitanjeImaSlike) {
      return (
        <div key={trenutnoPitanje.id}>
          <PrikazPitanjaSlika
            pitanja={props.pitanja}
            setPitanja={props.setPitanja}
            pitanje={trenutnoPitanje.pitanje}
            odgovori={trenutnoPitanje.odgovori}
            tacanOdgovor={trenutnoPitanje.tacanOdgovor}
            index={index}
            posebnoBodovanje={props.posebnoBodovanje}
            brojBodova={
              props.posebnoBodovanje ? trenutnoPitanje.brojBodova : undefined
            }
            strukturaIspita={props.strukturaIspita}
          ></PrikazPitanjaSlika>
        </div>
      );
    } else {
      return (
        <div key={trenutnoPitanje.id}>
          <PrikazPitanja
            pitanja={props.pitanja}
            setPitanja={props.setPitanja}
            pitanje={trenutnoPitanje.pitanje}
            odgovori={trenutnoPitanje.odgovori}
            tacanOdgovor={trenutnoPitanje.tacanOdgovor}
            index={index}
            posebnoBodovanje={props.posebnoBodovanje}
            brojBodova={
              props.posebnoBodovanje ? trenutnoPitanje.brojBodova : undefined
            }
            strukturaIspita={props.strukturaIspita}
          ></PrikazPitanja>
          <br></br>
        </div>
      );
    }
  });
  const timestamp2 = props.vrijemeIspita;
  const time = new Date(timestamp2).toLocaleTimeString("it-IT");
  const date = new Date(timestamp2).toLocaleDateString("it-IT");
  const datumDanas = new Date().getTime();
  const datumDanasFormated = new Date(datumDanas).toLocaleDateString("it-IT");
  return (
    <div>
      <Typography variant="h2" style={{ textAlign: "center" }}>
        {props.selektovaniPredmet}
      </Typography>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Datum: {date.toString()}
      </Typography>
      {date.toString() === datumDanasFormated.toString() && (
        <Typography variant="body1" align="center" style={{ color: "red" }}>
          Napomena: Izabran danasnji datum
        </Typography>
      )}
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Vrijeme: {time.toString().slice(0, 5)}
      </Typography>
      {time.toString().slice(3, 5) !== "00" &&
        time.toString().slice(3, 5) !== "30" && (
          <Typography variant="body1" align="center" style={{ color: "red" }}>
            Napomena: Vrijeme ne zavrsava sa 00/30
          </Typography>
        )}
      {prikaziSvaPitanja}
      <div style={{ height: "100px" }}></div>
    </div>
  );
}
