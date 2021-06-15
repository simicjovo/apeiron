import React from "react";
import PrikazPitanja from "./PrikazPitanja";
import PrikazPitanjaSlika from "./PrikazPitanjaSlika";
import NovoPitanje from "./NovoPitanje";
import "./generisanjePitanja.css";

export default function GenerisanjePitanja(props) {
  const prikaziSvaPitanja = props.pitanja.map((trenutnoPitanje, index) => {
    console.log(trenutnoPitanje);
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
            testPreview={props.testPreview}
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
  return (
    <div className="pitanja">
      <NovoPitanje
        pitanja={props.pitanja}
        setPitanja={props.setPitanja}
        posebnoBodovanje={props.posebnoBodovanje}
        strukturaIspita={props.strukturaIspita}
        sadrziSlike={props.sadrziSlike}
      ></NovoPitanje>
      <div className="prikazPitanja">
        {prikaziSvaPitanja.reverse()}
        <div style={{ height: "100px" }}></div>
      </div>
    </div>
  );
}
