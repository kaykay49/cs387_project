import React, { useContext } from "react";
import MediaPreview from "./MediaPreview";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import { Typography, CardContent, Card } from "@material-ui/core";
import useStyles from "./styles";

const ProductCard = ({ product }) => {
  const classes = useStyles();
  const { savePreview } = useContext(ProductContext);
  const history = useHistory();

  const handleClick = (product) => {
    savePreview(product);
    history.push("/preview");
  };

  return (
    <Card
      onClick={() => handleClick(product)}
      className={classes.rootProducts}
      key={product.id}
    >
      <MediaPreview product={product} />
      <CardContent>
        <Typography
          className={classes.productName}
          align="center"
          gutterBottom
          variant="body1"
          component="h2"
        >
          <b>{product.name}</b>
        </Typography>
        <Typography align="center" variant="body1" component="p">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
