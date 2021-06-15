import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./prikazSvihTestova.css";

export default function PrikazSvihTestova() {
  const [testovi, setTestovi] = useState([]);
  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    axios
      .get("/tests/get")
      .then((res) => {
        setTestovi(res.data);
      })

      .catch((err) => console.log(err));
  };
  const listTests = testovi.map((test, i) => (
    <Link
      key={test._id}
      to={`prikaziSveTestove/test/${test._id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        style={{
          width: "250px",
          height: "150px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          backgroundColor: "#49a",
          color: "white",
        }}
      >
        <CardContent>
          <Typography align="center" variant="h6">
            {test.predmet}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  ));
  return (
    <div>
      <Grid container className="prikazKartica">
        {listTests}
      </Grid>
    </div>
  );
}
