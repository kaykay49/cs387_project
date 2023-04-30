import React from "react";
import { useHistory } from "react-router-dom";

import { Grid, Typography, Button } from "@material-ui/core";
import { Box, Link } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";

const ProductDetails = ({ preview, calculateAverageReview, reviews }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid item xs={12} md={4} lg={6}>
      <Button
        onClick={() => history.push(`/shop`)}
        size="large"
        variant="contained"
        color="primary"
      >
        Back To Shopping
      </Button>
      <Typography variant="h6" className={classes.productInfo}>
        Shop / {preview.category}
      </Typography>
      <Typography align="left" variant="h3" className={classes.productName}>
        {preview.name}
      </Typography>
      <Box
        className={classes.review}
        display="flex"
        justifyContent="left"
        component="fieldset"
        mb={2}
        borderColor="transparent"
      >
        <Rating
          name="half-rating-read"
          value={calculateAverageReview()}
          precision={0.5}
          readOnly
        />
        <Typography className={classes.reviewLength}>
          ({reviews.length})
        </Typography>
        <Typography className={classes.textReview} variant="body1">
          <Link
            className={classes.cursor}
            onClick={() => history.push(`/review`)}
          >
            Write A Review
          </Link>
        </Typography>
      </Box>
      <img
        className={classes.image}
        src={preview.productpreview}
        alt={preview.name}
      />
    </Grid>
  );
};

export default ProductDetails;
