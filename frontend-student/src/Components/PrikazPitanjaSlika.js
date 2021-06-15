import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import ImageZoom from "react-medium-image-zoom";
import "./prikazPitanja.css";

export default function PrikazPitanjaSlika(props) {
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
              style={{ width: "0%", verticalAlign: "top", marginTop: "30px" }}
              value="a"
              onChange={handleAnswerChange}
              name="odgovor"
              checked={props.test.pitanja[props.index].tacanOdgovor === "a"}
            ></Radio>
            <ImageZoom
              image={{
                src: props.odgovori[0],
                alt: "Odg 1",
                style: { width: "100px", height: "100px", marginLeft: "30px" },
              }}
              zoomImage={{ src: props.odgovori[0], alt: "Odg 1" }}
            ></ImageZoom>
            <br />
            <Radio
              style={{ width: "0%", verticalAlign: "top", marginTop: "30px" }}
              value="b"
              onChange={handleAnswerChange}
              name="odgovor"
              checked={props.test.pitanja[props.index].tacanOdgovor === "b"}
            ></Radio>
            <ImageZoom
              image={{
                src: props.odgovori[1],
                alt: "Odg 1",
                style: { width: "100px", height: "100px", marginLeft: "30px" },
              }}
              zoomImage={{ src: props.odgovori[1], alt: "Odg 1" }}
            ></ImageZoom>
            <br />
            <Radio
              style={{ width: "0%", verticalAlign: "top", marginTop: "30px" }}
              value="c"
              onChange={handleAnswerChange}
              name="odgovor"
              checked={props.test.pitanja[props.index].tacanOdgovor === "c"}
            ></Radio>
            <ImageZoom
              image={{
                src: props.odgovori[2],
                alt: "Odg 1",
                style: { width: "100px", height: "100px", marginLeft: "30px" },
              }}
              zoomImage={{ src: props.odgovori[2], alt: "Odg 1" }}
            ></ImageZoom>
            <br />
            <Radio
              style={{ width: "0%", verticalAlign: "top", marginTop: "30px" }}
              value="d"
              onChange={handleAnswerChange}
              name="odgovor"
              checked={props.test.pitanja[props.index].tacanOdgovor === "d"}
            ></Radio>
            <ImageZoom
              image={{
                src: props.odgovori[3],
                alt: "Odg 1",
                style: { width: "100px", height: "100px", marginLeft: "30px" },
              }}
              zoomImage={{ src: props.odgovori[3], alt: "Odg 1" }}
            ></ImageZoom>
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
