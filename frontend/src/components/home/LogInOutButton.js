import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const LogInOutButton = ({ variant, size, className, textVariant }) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = (params) => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const handleLogin = (params) => {
    history.push(`/signin`);
  };

  const loginText = user ? `Logout` : `Login`;
  const loginFunction = user ? handleLogout : handleLogin;

  return (
    <Button
      onClick={loginFunction}
      className={className}
      variant={variant}
      size={size}
    >
      <Typography variant={textVariant} gutterBottom>
        {loginText}
      </Typography>
    </Button>
  );
};

export default LogInOutButton;
