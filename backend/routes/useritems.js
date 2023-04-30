const userItemsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const pool = require("../db");

// get all useritems
userItemsRouter.get("/", async (req, res) => {
  try {
    const allUserItems = await pool.query("SELECT * FROM useritems");
    res.json(allUserItems.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// create a useritem
userItemsRouter.post("/", middleware.userExtractor, async (req, res) => {
  try {
    const userid = req.user.id;
    const { name, price, quantity, category, productpreview } = req.body;
    const newUserItem = await pool.query(
      "INSERT INTO useritems (name, price, quantity, category, productpreview, username) VALUES($1, $2, $3, $4, $5, (SELECT username FROM users WHERE id = $6)) RETURNING *",
      [name, price, quantity, category, productpreview, userid]
    );
    res.status(200).json(newUserItem.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});


// update a useritem
userItemsRouter.put("/:id", middleware.userExtractor, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, category, productpreview } = req.body;
    const updatedUsertItem = await pool.query(
      "UPDATE useritems SET name = ($1), price = ($2), quantity = ($3), category = ($4), productPreview = ($5) WHERE id = $6 RETURNING *",
      [name, price, quantity, category, productpreview, id]
    );
    res.status(200).json(updatedUsertItem.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = userItemsRouter;
