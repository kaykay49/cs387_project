import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import { Typography, Button } from "@material-ui/core";
import LogInOutButton from "./LogInOutButton";

const HomeSection = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useContext(UserContext);

  return (
    <div className="home-bg">
      <div className={classes.main}>
        <Button
          onClick={() => history.push(`/shop`)}
          className={classes.button}
          variant="contained"
          size="large"
        >
          <Typography className="button" variant="h5" gutterBottom>
            SHOP NOW
          </Typography>
        </Button>
        {!user && (
          <Button
            onClick={() => history.push(`/signup`)}
            className={classes.button}
            variant="contained"
            size="large"
          >
            <Typography className="button" variant="h5" gutterBottom>
              Sign Up
            </Typography>
          </Button>
        )}
        <LogInOutButton
          className={classes.button}
          variant="contained"
          size="large"
          textVariant="h5"
        ></LogInOutButton>
        {user && (
          <div className={classes.greeting}>
            <Typography variant="h2">Welcome {user?.firstname},</Typography>
            <Typography variant="h6">
              Exclusive offer: -15% this week on select items.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeSection;
