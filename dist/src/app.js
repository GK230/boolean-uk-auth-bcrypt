"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./resources/users/router"));
const router_2 = __importDefault(require("./resources/auth/router"));
const cors_1 = __importDefault(require("cors"));
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express_1.default();
// Middlewares
app.use(logger("dev"));
app.use(express_1.default.json());
app.use(cookieParser());
app.use(cors_1.default({ origin: "http://localhost:3001", credentials: true })); // Enables the OPTIONS request check in our API
// App routes
app.use(router_2.default);
app.use("/users", router_1.default);
app.use("/posts", postsRouter);
app.all("*", (req, res) => {
    res.status(404).json("No routes match");
});
module.exports = app;
