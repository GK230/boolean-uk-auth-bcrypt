import express from 'express'

const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

// App routes
app.all("*", (req, res) => {
    res.status(404).json("No routes match")
})

module.exports = app;
