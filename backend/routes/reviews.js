const reviewRouter = require("express").Router();
const middleware = require("../utils/middleware");
const pool = require("../db");

// get all reviews
reviewRouter.get("/", async (req, res) => {
  try {
    const allReviews = await pool.query("SELECT * FROM reviews");
    res.json(allReviews.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// create a review
reviewRouter.post("/", middleware.userExtractor, async (req, res) => {
  try {
    const userid = req.user.id;
    const { rating, title, comment, recommend, productId, date } = req.body;
    const newReview = await pool.query(
      "INSERT INTO reviews (rating, title, comment, recommend, productid, date, username) VALUES($1, $2, $3, $4, $5, $6, (SELECT username FROM users WHERE id = $7)) RETURNING *",
      [rating, title, comment, recommend, productId, date, userid]
    );
    res.status(200).json(newReview.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// delete a review
reviewRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM reviews WHERE id = $1", [id]);
    res.status(200).json("Review was deleted!");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = reviewRouter;
