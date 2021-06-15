import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import axios from "axios";

export default function Ocjene() {
  const [ocjene, setOcjene] = useState([]);
  const [samoPolozeni, setSamoPolozeni] = useState(false);
  useEffect(() => {
    axios
      .get("/student/grades")
      .then((res) => setOcjene(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSwitch = () => {
    setSamoPolozeni(!samoPolozeni);
  };

  const sviIspiti = ocjene.map((row) => (
    <TableRow
      key={row._id}
      style={{
        backgroundColor:
          row.ocjena < 6 ? "rgba(255, 0, 0, 0.2)" : "rgba(0, 255, 0, 0.2)",
      }}
    >
      <TableCell component="th" scope="row">
        {row.predmet}
      </TableCell>
      <TableCell align="right">
        {new Date(row.vrijemeIspita).toLocaleDateString("de-DE")}
      </TableCell>
      <TableCell align="right">{row.brojBodova}</TableCell>
      <TableCell align="right">{row.ocjena}</TableCell>
    </TableRow>
  ));
  const polozeniIspiti = ocjene
    .filter((row) => row.ocjena > 5)
    .map((row) => (
      <TableRow
        key={row._id}
        style={{ backgroundColor: "rgba(0, 255, 0, 0.2)" }}
      >
        <TableCell component="th" scope="row">
          {row.predmet}
        </TableCell>
        <TableCell align="right">
          {new Date(row.vrijemeIspita).toLocaleDateString("de-DE")}
        </TableCell>
        <TableCell align="right">{row.brojBodova}</TableCell>
        <TableCell align="right">{row.ocjena}</TableCell>
      </TableRow>
    ));
  return (
    <div style={{ marginTop: "20px" }}>
      <TableContainer
        style={{ width: "85%", margin: "auto" }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Predmet</TableCell>
              <TableCell align="right">Datum</TableCell>
              <TableCell align="right">Broj bodova</TableCell>
              <TableCell align="right">Ocjena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{samoPolozeni ? polozeniIspiti : sviIspiti}</TableBody>
        </Table>
      </TableContainer>
      <div style={{ float: "right", marginRight: "10%" }}>
        Samo polozeni ispiti
        <Switch
          checked={samoPolozeni}
          onChange={handleSwitch}
          color="primary"
        ></Switch>
      </div>
    </div>
  );
}
