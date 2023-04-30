const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cartItemsRouter = require("./routes/cartitems");
const productsRouter = require("./routes/products");
const reviewsRouter = require("./routes/reviews");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const userItemsRouter = require("./routes/useritems");
const middleware = require("./utils/middleware");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(morgan("tiny"));
app.use(middleware.tokenExtractor);

app.use("/api/cartitems", cartItemsRouter);
app.use("/api/products", productsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/useritems", userItemsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
