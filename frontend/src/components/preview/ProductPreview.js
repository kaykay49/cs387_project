import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import CustomerReviews from "./CustomerReviews";
import reviewService from "../../services/reviews";
import Overview from "./Overview";
import Footer from "../helper/Footer";
import ProductDetails from "./ProductDetails";
import ProductPrice from "./ProductPrice";

import { Container, Grid } from "@material-ui/core";

const ProductPreview = () => {
  const { preview } = useContext(ProductContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getProductReviews = async () => {
      const initialReviews = await reviewService.getAll();
      const productReviews = initialReviews.filter(
        (review) => preview.id === parseInt(review.productid)
      );
      setReviews(productReviews);
    };

    getProductReviews();
  }, [preview]);

  const calculateAverageReview = () => {
    const sum = reviews.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.rating;
    }, 0);

    return reviews.length === 0 ? 0 : sum / reviews.length;
  };

  return (
    <div>
      <Container className="cart-bg">
        <Grid container direction="row" alignItems="flex-start" spacing={10}>
          <ProductDetails
            preview={preview}
            reviews={reviews}
            calculateAverageReview={calculateAverageReview}
          />
          <ProductPrice preview={preview} />
        </Grid>
        <Overview preview={preview} />
        <CustomerReviews reviews={reviews} setReviews={setReviews} />
      </Container>
      <Footer />
    </div>
  );
};

export default ProductPreview;
