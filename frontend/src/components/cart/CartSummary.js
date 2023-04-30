import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useHistory } from "react-router-dom";
import { Typography, Grid, Button } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import useStyles from "./styles";

const CartSummary = ({ productList, calculateOrderTotal }) => {
  const classes = useStyles();
  const { calculateTotalQuantity } = useContext(CartContext);
  const history = useHistory();

  return (
    <Grid container direction="column" className={classes.summaryCart}>
      <Typography align="center" variant="h4">
        Order Summary
      </Typography>
      <Divider className={classes.divider} />
      <Typography className={classes.summaryItems} align="center" variant="h6">
        ITEMS: {calculateTotalQuantity()}
      </Typography>
      <Typography className={classes.summaryItems} align="center" variant="h6">
        TOTAL PRICE: ${calculateOrderTotal()}
      </Typography>
      <Button
        onClick={() => history.push(`/checkout`)}
        style={{
          fontSize: 22,
          width: 230,
          height: 70,
        }}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Checkout
      </Button>
    </Grid>
  );
};

export default CartSummary;
