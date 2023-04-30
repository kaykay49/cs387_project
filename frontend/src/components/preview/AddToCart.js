import React, { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";

import { Snackbar, Button } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import MuiAlert from "@material-ui/lab/Alert";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddToCart = ({ preview, setCompleteOrder }) => {
  const classes = useStyles();
  const { addProduct } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    const newProduct = {
      name: preview.name,
      price: preview.price,
      category: preview.category,
      quantity: preview.quantity,
      productpreview: preview.productpreview,
    };
    addProduct(newProduct);
    console.log(preview);
    setOpen(true);
    setCompleteOrder(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button
        id="cart"
        onClick={handleClick}
        startIcon={<AddShoppingCartIcon />}
        size="large"
        variant="outlined"
        className={classes.cartProductInfo}
        style={{
          width: 250,
          height: 70,
        }}
        color="secondary"
      >
        Add To Cart
      </Button>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert variant="standard" onClose={handleClose} severity="success">
          <Typography variant="h4">
            {preview.name} ({preview.quantity}) has been added to the Cart!
          </Typography>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddToCart;
