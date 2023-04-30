import React, { useState, useContext } from "react";
import Notification from "../helper/Notification";
import SignUpForm from "./SignUpForm";
import userService from "../../services/users";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

import { Avatar, Typography, Container } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "../signin/styles";

export default function SignUp() {
  const classes = useStyles();
  const { loginToApp } = useContext(UserContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createUser = async (userObject) => {
    try {
      const signupSuccess = await userService.signup(userObject);
      // after signing up, log user in
      const loginSuccess = await loginToApp(
        userObject.username,
        userObject.password
      );

      if (signupSuccess && loginSuccess) {
        history.push(`/`);
      }
    } catch (exception) {
      const errorMessage = `Invalid Username or Password: Must be at least 5 chars in length`;
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
          Sign up
        </Typography>
        <SignUpForm createUser={createUser} />
      </div>
    </Container>
  );
}
