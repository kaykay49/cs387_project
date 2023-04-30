import React, { useContext } from "react";
import { ShopContext } from "../../contexts/ShopContext";
import ProductCard from "./ProductCard";

import { Typography, Container, Grid } from "@material-ui/core";
import useStyles from "./styles";

const Products = () => {
  const classes = useStyles();
  const { products } = useContext(ShopContext);

  return (
    <Container>
      <Grid container>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} md={6} lg={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <div>
            <Typography
              align="center"
              color="textSecondary"
              className={classes.text}
              variant="h4"
            >
              No products found with that name.
            </Typography>
            <Typography
              align="center"
              color="textSecondary"
              className={classes.text}
              variant="h6"
            >
              (Please wait until the API is fetched on initial load)
            </Typography>
          </div>
        )}
      </Grid>
    </Container>
  );
};

export default Products;
