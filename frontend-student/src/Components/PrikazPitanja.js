import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import "./prikazPitanja.css";

export default function PrikazPitanja(props) {
  const [rerender, setRerender] = useState(true);
  const handleAnswerChange = (e) => {
    let currentTest = props.test;
    currentTest.pitanja[props.index].tacanOdgovor = e.target.value;
    props.setTest(currentTest);
    setRerender(!rerender);
  };
  return (
    <div className="kartica">
      <Card variant="outlined">
        <CardContent style={{ wordWrap: "break-word" }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ fontWeight: "bold" }}
          >
            {props.pitanje}
          </Typography>
          <div style={{ marginLeft: "20%" }}>
            <Radio
              style={{ width: "0%", verticalAlign: "top", marginTop: "-10px" }}
              value="a"
              onChange={handleAnswerChange}
              name="odgovor"
              checked={props.test.pitanja[props.index].tacanOdgovor === "a"}
            ></Radio>
            <Typography
              variant="body1"
              style={{
                display: "inline-block",
                marginLeft: "20px",
                width: "70%",
                textAlign: "justify",
              }}
              align="center"
              gutterBottom
            >
              {props.odgovori[0]}
            </Typography>
            <br />
            <Radio
              style={{ width: "0%", verticalAlign: "top", marginTop: "-10px" }}
              value="b"
              onChange={handleAnswerChange}
              name="odgovor"
              checked={props.test.pitanja[props.index].tacanOdgovor === "b"}
            ></Radio>
            <Typography
              variant="body1"
              style={{
                display: "inline-block",
                marginLeft: "20px",
                width: "70%",
                textAlign: "justify",
              }}
              align="center"
              gutterBottom
            >
              {props.odgovori[1]}
            </Typography>
            <br />
            <Radio
              style={{ width: "0%", verticalAlign: "top", marginTop: "-10px" }}
              value="c"
              onChange={handleAnswerChange}
              name="odgovor"
              checked={props.test.pitanja[props.index].tacanOdgovor === "c"}
            ></Radio>
            <Typography
              variant="body1"
              style={{
                display: "inline-block",
                marginLeft: "20px",
                width: "70%",
                textAlign: "justify",
              }}
              align="center"
              gutterBottom
            >
              {props.odgovori[2]}
            </Typography>
            <br />
            <Radio
              style={{ width: "0%", verticalAlign: "top", marginTop: "-10px" }}
              value="d"
              onChange={handleAnswerChange}
              name="odgovor"
              checked={props.test.pitanja[props.index].tacanOdgovor === "d"}
            ></Radio>
            <Typography
              variant="body1"
              style={{
                display: "inline-block",
                marginLeft: "20px",
                width: "70%",
                textAlign: "justify",
              }}
              align="center"
              gutterBottom
            >
              {props.odgovori[3]}
            </Typography>
            <br />
          </div>
          {props.posebnoBodovanje && (
            <Typography style={{ textAlign: "end" }}>
              Broj bodova : {props.brojBodova}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
