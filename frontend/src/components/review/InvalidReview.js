import React, { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { useHistory } from "react-router-dom";
import Footer from "../helper/Footer";

import { Container, Typography, Button } from "@material-ui/core";
import useStyles from "./styles";

const InvalidReview = () => {
  const classes = useStyles();
  const history = useHistory();
  const { preview } = useContext(ProductContext);

  const handleClick = () => {
    history.push("/preview");
  };

  return (
    <div>
      <Container>
        <Button
          onClick={() => handleClick(preview)}
          size="large"
          variant="contained"
          color="primary"
        >
          Back To Product
        </Button>
        <Typography className={classes.error} align="center" variant="h5">
          You must be logged in to write a review
        </Typography>
      </Container>
      <Footer />;
    </div>
  );
};

export default InvalidReview;
