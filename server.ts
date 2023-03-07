import express, { Express, NextFunction, Request, Response } from "express";

import DBCONNECT from "./db";
import ErrorHandler from "./middlewares/error";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";

dotenv.config();

const PORT = process.env.PORT || 3000;
const APP: Express = express();
APP.use(express.json());

APP.use("/user", userRouter)

// Error Handler
APP.use(ErrorHandler)

APP.listen(PORT, async() => {
    // connect to DB
    await DBCONNECT();
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
})