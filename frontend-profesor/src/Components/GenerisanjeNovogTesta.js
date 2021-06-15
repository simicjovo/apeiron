import React, { useState } from "react";
import GenerisanjeNovogPitanja from "./GenerisanjeNovogPitanja";
import axios from "axios";

export default function GenerisanjeNovogTesta(props) {
  console.log(props);
  const [test, setTest] = useState({
    predmet: "",
    pitanja: [],
  });

  const handleRemoveQuestion = (e, brisi) => {
    e.preventDefault();
    setTest({
      ...test,
      pitanja: test.pitanja.filter((pitanje) => pitanje !== brisi),
    });
  };

  const listQuestions = test.pitanja.map((pitanje, i) => (
    <div key={i}>
      <h1>{pitanje.pitanje}</h1>
      <ul>
        {pitanje.odgovori.map((odgovor, i) => (
          <li key={i}>{odgovor}</li>
        ))}
      </ul>
      <button onClick={(e) => handleRemoveQuestion(e, pitanje)}>
        Obrisi Pitanje
      </button>
    </div>
  ));

  const handleSaveTest = () => {
    if (test.predmet === "") {
      alert("Unesite naziv testa");
    } else {
      axios
        .post("/tests/add", test)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const handlePredmetOnChange = (e) => {
    setTest({
      ...test,
      predmet: e.target.value,
    });
  };

  return (
    <div>
      <input
        type="text"
        value={test.predmet}
        onChange={(e) => handlePredmetOnChange(e)}
      ></input>
      {listQuestions}
      <GenerisanjeNovogPitanja
        setTest={setTest}
        test={test}
      ></GenerisanjeNovogPitanja>
      <br></br>
      <button onClick={() => handleSaveTest()}>Snimi test</button>
    </div>
  );
}
