import React from "react";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

export default function LoginComponent(props) {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={props.failedLogin}
        autoHideDuration={6000}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={props.handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <MuiAlert severity="error" variant="filled" onClose={props.handleClose}>
          Pogresni podaci
        </MuiAlert>
      </Snackbar>
      <form>
        <Grid
          container
          item
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: 10, minHeight: "100vh" }}
        >
          <div></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10%",
            }}
          >
            <Grid container justify="center">
              <img
                src="https://apeiron-uni.eu/wp-content/uploads/2020/07/Logo_770x156.png"
                style={{ maxWidth: 600, width: "90%", padding: "5%" }}
                alt="logo"
              ></img>
            </Grid>

            <TextField
              autoFocus={true}
              type="text"
              label="Username"
              margin="normal"
              justify="center"
              style={{
                maxWidth: "50%",
                marginLeft: "25%",
                textAlign: "center",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <AccountCircle></AccountCircle>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => props.setUsername(e.target.value)}
            ></TextField>
            <TextField
              type="password"
              label="Password"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <LockRounded></LockRounded>
                  </InputAdornment>
                ),
              }}
              style={{
                maxWidth: "50%",
                marginLeft: "25%",
                textAlign: "center",
              }}
              onChange={(e) => props.setPassword(e.target.value)}
            ></TextField>
            <div style={{ height: 20 }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ float: "right", marginRight: "25%" }}
                onClick={props.handleOnClick}
              >
                Log in
              </Button>
            </div>
          </div>
          <div></div>
        </Grid>
      </form>
    </div>
  );
}
