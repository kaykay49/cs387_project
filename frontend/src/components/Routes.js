import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./helper/Navbar";
import HomeSection from "./home/HomeSection";
import ShopSection from "./shop/ShopSection";
import CartSection from "./cart/CartSection";
import ProductPreview from "./preview/ProductPreview";
import SignUp from "./signup/SignUp";
import SignIn from "./signin/SignIn";
import Checkout from "./checkout/Checkout";
import Review from "./review/Review";

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomeSection} />
        <Route exact path="/shop" component={ShopSection} />
        <Route exact path="/cart" component={CartSection} />
        <Route exact path="/preview" component={ProductPreview} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/review" component={Review} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
