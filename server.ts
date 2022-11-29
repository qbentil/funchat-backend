import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import DBCONNECT from "./db";

dotenv.config();

const PORT = process.env.PORT || 3000;
const APP: Express = express();


APP.listen(PORT, () => {
    // connect to DB
    DBCONNECT();
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
})