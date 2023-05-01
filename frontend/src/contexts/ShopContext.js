import React, { useState, createContext, useEffect } from "react";
import productService from "../services/products";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getAll().then((initialProducts) => {
      setProducts(initialProducts);
    });
  }, []);

  const filterProduct = (category) => {
    const filteredProduct = products.filter(
      (item) => item.category === category
    );
    setProducts(filteredProduct);
  };

  return (
    <ShopContext.Provider value={{ products, setProducts, filterProduct }}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
