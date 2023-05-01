import React from "react";
import Routes from "./components/Routes";
import ShopContextProvider from "./contexts/ShopContext";
import ProductContextProvider from "./contexts/ProductContext";
import CartContextProvider from "./contexts/CartContext";
import UserContextProvider from "./contexts/UserContext";
import { ThemeProvider } from "@material-ui/core";
import theme from "./AppStyles";

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <ShopContextProvider>
          <ProductContextProvider>
            <CartContextProvider>
              <ThemeProvider theme={theme}>
                <Routes />
              </ThemeProvider>
            </CartContextProvider>
          </ProductContextProvider>
        </ShopContextProvider>
      </UserContextProvider>
    </div>
  );
};

export default App;
