import React, { useState, useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Notification from "../helper/Notification";
import Footer from "../helper/Footer";
import ReviewForm from "./ReviewForm";
import InvalidReview from "./InvalidReview";
import reviewService from "../../services/reviews";

import { Container, Typography, Divider, Grid } from "@material-ui/core";
import useStyles from "./styles";

const Review = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { preview } = useContext(ProductContext);
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createReview = async (reviewObject) => {
    try {
      const reviewSuccess = await reviewService.create(reviewObject);
      if (reviewSuccess) {
        history.push("/preview");
      }
    } catch (exception) {
      const errorMessage = `Unable to submit review: Please make sure all fields are filled in.`;
      setOpen(true);
      setErrorMessage(errorMessage);
      console.log(exception);
    }
  };

  return user ? (
    <div>
      <Container>
        <Notification message={errorMessage} open={open} setOpen={setOpen} />
        <Typography align="left" variant="h4">
          Write Your Review
        </Typography>
        <Grid
          container
          className={classes.product}
          onClick={() => history.push("/preview")}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <img
            className={classes.image}
            src={preview.productpreview}
            alt={preview.name}
          />
          <Typography align="left" variant="h6">
            {preview.name}
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
        <Typography className={classes.heading} variant="h6">
          Overall Rating
        </Typography>
        <ReviewForm createReview={createReview} />
      </Container>
      <Footer />
    </div>
  ) : (
    <InvalidReview />
  );
};

export default Review;
