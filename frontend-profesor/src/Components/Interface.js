import React from "react";
import { Link } from "react-router-dom";
import "./interface.css";

export default function Interface() {
  return (
    <div className="intContainer">
      <Link to="/noviTest">
        <img
          src="NoviTest.png"
          alt=""
          style={{
            maxWidth: "250px",
          }}
        ></img>
      </Link>
      <Link to="/prikaziSveTestove">
        <img
          src="PrikaziTestove.png"
          alt=""
          style={{
            maxWidth: "250px",
          }}
        ></img>
      </Link>
    </div>
  );
}
