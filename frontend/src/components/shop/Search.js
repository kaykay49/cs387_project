import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../contexts/ShopContext";
import productService from "../../services/products";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const Search = () => {
  const { products, setProducts } = useContext(ShopContext);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search.length > 0) {
      const newProductList = products.filter((product) =>
        product.name.toLowerCase().match(search)
      );
      setProducts(newProductList);
    } else {
      productService.getAll().then((initialProducts) => {
        setProducts(initialProducts);
      });
    }
  }, [search]);

  return (
    <div>
      <TextField
        onChange={handleSearch}
        value={search}
        variant="filled"
        color="secondary"
        name="search"
        label="Search product"
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        style={{ paddingRight: "30px" }}
      />
    </div>
  );
};

export default Search;
