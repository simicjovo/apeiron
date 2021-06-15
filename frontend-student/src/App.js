import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Components/interface.css";
import axios from "axios";
import LoginComponent from "./Components/LoginComponent";
import Interface from "./Components/Interface";
import PrikazSvihTestova from "./Components/PrikazSvihTestova";
import PrikazTesta from "./Components/PrikazTesta";
import Ocjene from "./Components/Ocjene";
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
  const [failedLogin, setFailedLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get("/student/login/check")
      .then((res) => {
        setUser(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  const handleOnClick = (e) => {
    e.preventDefault();
    axios
      .post(
        "/student/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setFailedLogin(false);
        setUser(true);
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

  const handleLogOut = () => {
    axios
      .get("/student/login/logout", { withCredentials: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setUser(false);
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
              path="/prikaziPredmete"
              exact
              component={PrikazSvihTestova}
            ></Route>
            <Route path="/test/:id" exact component={PrikazTesta}></Route>
            <Route path="/ocjene" exact component={Ocjene}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
