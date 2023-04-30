import React, { useState, useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";

import { TextField, Typography, Button, Radio } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import useStyles from "./styles";

const ReviewForm = ({ createReview }) => {
  const classes = useStyles();
  const { preview } = useContext(ProductContext);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState("true");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newRecommend = recommend === "true" ? true : false;
    createReview({
      rating,
      title,
      comment,
      recommend: newRecommend,
      productId: preview.id,
      date: new Date().toISOString().slice(0, 10),
    });
    setRating(5);
    setTitle("");
    setComment("");
    setRecommend("true");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Rating
        id="rating"
        onChange={(e) => setRating(e.target.value)}
        name="half-rating"
        value={rating}
        precision={0.5}
        size="large"
      />
      <Typography className={classes.heading} variant="h6">
        Review Details
      </Typography>
      <Typography variant="body1">
        Let us know how this product is working for you.
      </Typography>
      <TextField
        id="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Review Title"
        name="title"
      />
      <Typography variant="caption">
        Write a short, descriptive title for your review.
      </Typography>
      <TextField
        id="comment"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Your Review"
        name="comment"
        multiline
        rows={5}
      />
      <Typography className={classes.heading} variant="h6">
        Would you recommend this to a friend?
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          id="recommend"
          value={recommend}
          onChange={(e) => setRecommend(e.target.value)}
        >
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
      <Button
        className={classes.button}
        type="submit"
        size="large"
        variant="contained"
        color="primary"
      >
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
