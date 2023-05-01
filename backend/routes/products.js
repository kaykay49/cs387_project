const productsRouter = require("express").Router();
const pool = require("../db");
const io = require('socket.io-client');
const socket = io.connect('http://localhost:5796', {reconnect: true});

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

productsRouter.get("/search/:key", async (req, res) => {
  try {
    const { key } = req.params;
    socket.on('connect', function (socket) {
        console.log('Connected!');
        socket.emit('CH01', 'me', 'test msg');
        socket.on('message', (data) => {
          res.status(200).json(data.split(' '))
      })
    });
    
    
    
    res.status(200).json(product.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = productsRouter;
