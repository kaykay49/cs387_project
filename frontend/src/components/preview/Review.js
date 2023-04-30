import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Typography, Box, Divider, Grid } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import { IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const Review = ({ review, handleDelete }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  return (
    <div className={classes.reviewWidth}>
      <Box
        className={classes.review}
        display="flex"
        justifyContent="left"
        alignItems="center"
        component="fieldset"
        borderColor="transparent"
      >
        <Rating name="read-only" value={review.rating} readOnly />
        <Typography className={classes.textReview} variant="body1">
          {review.title}
        </Typography>
        {user?.username === review.username && (
          <IconButton onClick={() => handleDelete(review.id)}>
            <DeleteForeverIcon></DeleteForeverIcon>
          </IconButton>
        )}
      </Box>
      <Typography variant="subtitle2" gutterBottom>
        Reviewed by {review?.username} — {review.date}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {review.comment}
      </Typography>
      <Grid container alignItems="center">
        {review.recommend === true ? (
          <InsertEmoticonIcon />
        ) : (
          <SentimentVeryDissatisfiedIcon />
        )}
        <Typography className={classes.icon} variant="caption" gutterBottom>
          {review.recommend === true ? (
            <div>
              <b>Yes,</b> I would recommend this to a friend
            </div>
          ) : (
            <div>
              <b>No,</b> I would not recommend this to a friend
            </div>
          )}
        </Typography>
      </Grid>
      <Divider className={classes.divider} />
    </div>
  );
};

export default Review;
