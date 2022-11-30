import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import DBCONNECT from "./db";
import userRouter from "./routes/user.route";
import ErrorHandler from "./middlewares/error";

dotenv.config();

const PORT = process.env.PORT || 3000;
const APP: Express = express();
APP.use(express.json());

APP.use("/user", userRouter)

// Error Handler
APP.use(ErrorHandler)

APP.listen(PORT, () => {
    // connect to DB
    DBCONNECT();
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
})