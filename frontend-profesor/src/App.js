import React, { useState, useEffect } from "react";
import Interface from "./Components/Interface";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import GenerisanjeNovogTesta from "./Components/GenerisanjeNovogTesta";
import PrikazSvihTestova from "./Components/PrikazSvihTestova";
import TestDetalji from "./Components/TestDetalji";
import LoginComponent from "./Components/LoginComponent";
import NoviTestStepper from "./Components/NoviTestStepper/NoviTestStepper";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Components/interface.css";
import axios from "axios";
axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [predmeti, setPredmeti] = useState([]);
  const [failedLogin, setFailedLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();
  const handleLogOut = () => {
    axios
      .get("/login/logout", { withCredentials: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setUser(false);
  };

  useEffect(() => {
    axios
      .get("/login/check")
      .then((res) => {
        setUser(true);
        setIsLoading(false);
        setPredmeti(res.data.predmeti);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  const handleOnClick = (e) => {
    e.preventDefault();
    axios
      .post(
        "/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setFailedLogin(false);
        setUser(true);
        setPredmeti(res.data.predmeti);
      })
      .catch((err) => {
        console.log(err);
        setFailedLogin(true);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFailedLogin(false);
  };
  if (isLoading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return (
      <LoginComponent
        handleOnClick={handleOnClick}
        handleClose={handleClose}
        setUsername={setUsername}
        setPassword={setPassword}
        failedLogin={failedLogin}
      ></LoginComponent>
    );
  } else {
    return (
      <div className={classes.root}>
        <BrowserRouter>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                <Link to="/" style={{ color: "#FFF", textDecoration: "none" }}>
                  <Button color="inherit">Pocetna</Button>
                </Link>
              </Typography>
              <Link to="/" style={{ color: "#FFF", textDecoration: "none" }}>
                <Button color="inherit" onClick={() => handleLogOut()}>
                  LOGOUT
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path="/" exact component={() => <Interface />}></Route>
            <Route
              path="/noviTest"
              exact
              render={(props) => (
                <NoviTestStepper predmeti={predmeti} {...props} />
              )}
            ></Route>
            <Route
              path="/prikaziSveTestove"
              exact
              component={PrikazSvihTestova}
            ></Route>
            <Route
              path="/prikaziSveTestove/test/:id"
              component={TestDetalji}
            ></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
