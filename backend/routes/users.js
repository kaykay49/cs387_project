const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const pool = require("../db");

// get all users
usersRouter.get("/", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// create a user
usersRouter.post("/", async (req, res) => {
  try {
    const { username, firstname, lastname, password } = req.body;

    if (!password || password.length < 5) {
      return response
        .status(400)
        .json({ error: "invalid password: must be at least 5 chars" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      "INSERT INTO users (username, firstname, lastname, passwordHash) VALUES($1, $2, $3, $4) RETURNING *",
      [username, firstname, lastname, passwordHash]
    );
    res.status(200).json(newUser.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = usersRouter;
