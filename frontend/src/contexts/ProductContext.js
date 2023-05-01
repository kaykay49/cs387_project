import React, { useState, createContext } from "react";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [preview, setPreview] = useState({});

  const savePreview = (product) => {
    setPreview(product);
  };

  return (
    <ProductContext.Provider value={{ preview, savePreview }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
