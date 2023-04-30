import axios from "axios";
const baseUrl = "http://localhost:4000/api/products";
//const baseUrl = "/api/products";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const productService = { getAll };

export default productService;
