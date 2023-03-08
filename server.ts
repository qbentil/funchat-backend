import express, { Express, NextFunction, Request, Response } from "express";

import DBCONNECT from "./db";
import ErrorHandler from "./middlewares/error";
import dotenv from "dotenv";
import { USER_ROUTE, AUTH_ROUTE } from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3000;
const APP: Express = express();
APP.use(express.json());

APP.use("/user", USER_ROUTE)
APP.use("/auth", AUTH_ROUTE)

// Error Handler
APP.use(ErrorHandler)

APP.listen(PORT, async() => {
    // connect to DB
    await DBCONNECT();
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
})