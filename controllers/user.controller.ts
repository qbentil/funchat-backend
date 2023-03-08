import { NextFunction, Request, Response } from "express";

import CreateError from "../util/Error";
import USER from "../models/user.model";


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get all users
        const users = await USER.find();
        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        next(error);
    }
}
