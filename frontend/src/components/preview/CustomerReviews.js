import React from "react";
import reviewService from "../../services/reviews";
import { Typography, Divider } from "@material-ui/core";
import useStyles from "./styles";
import Review from "./Review";

const CustomerReviews = ({ reviews, setReviews }) => {
  const classes = useStyles();

  const handleDelete = (key) => {
    if (window.confirm("Remove This Review?")) {
      reviewService.remove(key).then(() => {
        setReviews(reviews.filter((review) => review.id !== key));
      });
    }
  };

  return (
    <div>
      <Typography align="left" variant="h5" className={classes.customerReview}>
        Customer Reviews
      </Typography>
      <Divider className={classes.divider} />
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Review review={review} handleDelete={handleDelete} key={review.id} />
        ))
      ) : (
        <Typography align="left" className={classes.divider} variant="body1">
          No reviews for this product
        </Typography>
      )}
    </div>
  );
};

export default CustomerReviews;
