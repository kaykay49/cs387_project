const cartItemsRouter = require("express").Router();
const pool = require("../db");

// get all cartitems
cartItemsRouter.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM cartitems");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// get a specific cartitem
cartItemsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM cartitems WHERE id = $1", [
      id,
    ]);
    res.status(200).json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// create a cartitem
cartItemsRouter.post("/", async (req, res) => {
  try {
    const { name, price, quantity, category, productpreview } = req.body;
    const newCartItem = await pool.query(
      "INSERT INTO cartitems (name, price, quantity, category, productpreview) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, price, quantity, category, productpreview]
    );
    res.status(200).json(newCartItem.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// delete a cartitem
cartItemsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM cartitems WHERE id = $1", [id]);
    res.status(200).json("Item was deleted!");
  } catch (error) {
    console.log(error.message);
  }
});

// update a cartitem
cartItemsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, category, productpreview } = req.body;
    const updatedCartItem = await pool.query(
      "UPDATE cartitems SET name = ($1), price = ($2), quantity = ($3), category = ($4), productPreview = ($5) WHERE id = $6 RETURNING *",
      [name, price, quantity, category, productpreview, id]
    );
    res.status(200).json(updatedCartItem.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = cartItemsRouter;
