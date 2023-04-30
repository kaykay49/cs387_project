import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import ScrollToTop from "./ScrollToTop";

import LogInOutButton from "../home/LogInOutButton";
import { AppBar, Toolbar } from "@material-ui/core";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import { Typography, Box } from "@material-ui/core";
import useStyles from "./styles";

const Navbar = (props) => {
  const classes = useStyles();
  const { calculateTotalQuantity } = useContext(CartContext);
  // dynamically change color of navbar based on current url
  const path = useLocation().pathname;
  const location = path.split("/")[1];

  return (
    <div className={classes.navbar}>
      <AppBar position="sticky" className={classes.header}>
        <Toolbar className={location ? location : "home"}>
          <Link to="/" className={classes.company}>
            <Typography variant="h6">
              <Box letterSpacing={4}>DBIS Clothes</Box>
            </Typography>
          </Link>
          <Link to="/shop" className={classes.spacing}>
            <Typography variant="h6">Shop</Typography>
          </Link>
          <Link to="/cart" className={classes.spacing}>
            <LocalMallOutlinedIcon fontSize="large" /> (
            {calculateTotalQuantity()})
          </Link>
          <LogInOutButton
            className={classes.spacing}
            variant="text"
            size="small"
            textVariant="h6"
          ></LogInOutButton>
        </Toolbar>
      </AppBar>
      <ScrollToTop />
    </div>
  );
};

export default Navbar;
