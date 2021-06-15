import React from "react";
import { Link } from "react-router-dom";
import "./interface.css";

export default function Interface() {
  return (
    <div className="intContainer">
      <Link to="/ocjene">
        <button>Ocjene</button>
      </Link>
      <Link to="/prikaziPredmete">
        <button>Nezavrseni predmeti</button>
      </Link>
    </div>
  );
}
