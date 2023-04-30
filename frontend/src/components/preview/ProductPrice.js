import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AddToCart from "./AddToCart";

import { Box, Grid, Typography, Button } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import useStyles from "./styles";

const ProductPrice = ({ preview }) => {
  const classes = useStyles();
  const history = useHistory();
  const [completeOrder, setCompleteOrder] = useState(false);

  return (
    <Grid item xs="auto" md="auto" lg="auto" className={classes.price}>
      <Typography variant="h6">
        <Box letterSpacing={6}>DBIS Clothes</Box>
      </Typography>
      <Typography variant="h3" className={classes.productInfo}>
        ${preview.price}
      </Typography>
      <AddToCart preview={preview} setCompleteOrder={setCompleteOrder} />
      {completeOrder && (
        <Button
          onClick={() => history.push(`/cart`)}
          startIcon={<CheckCircleOutlineIcon />}
          size="large"
          variant="outlined"
          className={classes.productInfo}
          style={{
            width: 250,
            height: 70,
            color: "#C71585",
            fontSize: 17,
          }}
          color="inherit"
        >
          Complete Order
        </Button>
      )}
    </Grid>
  );
};

export default ProductPrice;
