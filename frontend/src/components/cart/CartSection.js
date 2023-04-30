import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import CartSummary from "../../components/cart/CartSummary";
import CartDetails from "../../components/cart/CartDetails";
import Footer from "../helper/Footer";
import { Container, Grid } from "@material-ui/core";
import useStyles from "./styles";

const CartSection = () => {
  const classes = useStyles();
  const { productList, calculateOrderTotal } = useContext(CartContext);

  return (
    <div>
      <Container>
        <Grid container direction="row">
          <CartDetails productList={productList} />
          <CartSummary
            productList={productList}
            calculateOrderTotal={calculateOrderTotal}
          />
        </Grid>
      </Container>
      <div className={classes.footer}></div>
      <Footer />
    </div>
  );
};

export default CartSection;
