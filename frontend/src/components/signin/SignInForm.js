import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, Link, Grid, TextField } from "@material-ui/core";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import useStyles from "./styles";

const SignInForm = ({ userLogin }) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    userLogin(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLogin} className={classes.form} noValidate>
      <TextField
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link
            className={classes.cursor}
            onClick={() => history.push(`/signup`)}
            variant="body2"
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignInForm;
