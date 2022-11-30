import { Request, Response, NextFunction } from "express";
import USER from "../models/user.model";
import { GeneratePIN } from "../util";
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

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email } = req.body;
    try {

        // check if the user already exists by email or username
        const exist = await USER.findOne({ $or: [{ email }, { username }] });

        if (exist) return next({ statusCode: 400, message: "User already exists" });

        const password = await GeneratePIN()
        const user = await USER.create({
            username,
            email,
            password: password.HASH
        })

        // TODO: send email to user with password.PIN


        res.status(201).json({
            success: true,
            data: user,
            secret: password.PIN
        })
    } catch (error) {
        next(error);
    }
}