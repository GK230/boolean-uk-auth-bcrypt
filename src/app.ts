import express from "express";
import usersRouter from "./resources/users/router";
import authRouter from "./resources/auth/router";
import cors from "cors";

const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3001", credentials: true })); // Enables the OPTIONS request check in our API

// App routes

app.use(authRouter);

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.all("*", (req, res) => {
  res.status(404).json("No routes match");
});

module.exports = app;
