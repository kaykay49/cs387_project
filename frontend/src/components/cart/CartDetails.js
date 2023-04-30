import React from "react";
import CartProducts from "./CartProducts";
import { Typography, Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import useStyles from "./styles";

const CartDetails = ({ productList }) => {
  const classes = useStyles();

  return (
    <Grid item xs="auto" md="auto" lg="auto" className={classes.cartWidth}>
      <Typography variant="h2">Shopping Cart</Typography>
      <Divider variant="fullWidth" className={classes.divider} />
      <Grid container>
        <Divider className={classes.divider} />
        <Typography className={classes.heading} variant="body1">
          Product Details
        </Typography>
        <Typography className={classes.cartDetails} variant="body1">
          Quantity
        </Typography>
        <Typography className={classes.cartDetails} variant="body1">
          Price
        </Typography>
        <Typography className={classes.cartDetails} variant="body1">
          Subtotal
        </Typography>
      </Grid>
      <Divider className={classes.divider} />
      {productList.length ? (
        productList.map((product) => (
          <CartProducts product={product} key={product.id} />
        ))
      ) : (
        <Typography align="center" className={classes.divider} variant="h5">
          — Your Cart is Empty —
        </Typography>
      )}
    </Grid>
  );
};

export default CartDetails;
