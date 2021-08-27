"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const JWT_SECRET = process.env.JWT;
{
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET);
}
