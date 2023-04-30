import React, { useState, useContext } from "react";
import Notification from "../helper/Notification";
import SignInForm from "./SignInForm";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

import { Avatar, Box, Typography, Container } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";

export default function SignIn() {
  const classes = useStyles();
  const { loginToApp } = useContext(UserContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userLogin = async (username, password) => {
    try {
      const loginSuccess = await loginToApp(username, password);
      if (loginSuccess) {
        history.push(`/`);
      }
    } catch (exception) {
      const errorMessage = `Invalid Username or Password`;
      setOpen(true);
      setErrorMessage(errorMessage);
      console.log(exception);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Notification message={errorMessage} open={open} setOpen={setOpen} />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <SignInForm userLogin={userLogin} />
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}
