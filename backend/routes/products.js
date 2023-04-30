const productsRouter = require("express").Router();
const pool = require("../db");

// get all products
productsRouter.get("/", async (req, res) => {
  try {
    const allProducts = await pool.query("SELECT * FROM products");
    res.json(allProducts.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// get a specific product
productsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    res.status(200).json(product.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = productsRouter;
