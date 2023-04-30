import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";

export default function Review({ addressInfo, cardInfo }) {
  const classes = useStyles();
  const { productList, calculateSubtotal, calculateOrderTotal } =
    useContext(CartContext);

  const payments = [
    { name: "Card type", detail: "Visa" },
    {
      name: "Card holder",
      detail: `${addressInfo.name} ${addressInfo.lastName}`,
    },
    { name: "Card number", detail: cardInfo.cardNumber },
    { name: "Expiry date", detail: cardInfo.expiryDate },
  ];

  const addresses = [
    addressInfo.address,
    addressInfo.city,
    addressInfo.province,
    addressInfo.postalCode,
    addressInfo.country,
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {productList.map((product) => (
          <ListItem className={classes.listItem} key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant="body2">
              ${calculateSubtotal(product)}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${calculateOrderTotal()}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {addressInfo.name} {addressInfo.lastName}
          </Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
