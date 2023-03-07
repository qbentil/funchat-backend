import { NextFunction, Request, Response } from "express";

import CreateError from "../util/Error";
import { GeneratePIN } from "../util";
import GenerateToken from "../util/token";
import USER from "../models/user.model";
import jwt from "jsonwebtoken";
import { verifyPIN } from './../util/index';
import Axios from "../util/Axios";

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
    const { username, email, fullname, about } = req.body;
    try {

        // check if the user already exists by email or username
        const exist = await USER.findOne({ $or: [{ email }, { username }] });

        if (exist) return next(CreateError("User already exists", 400));

        const password = await GeneratePIN()
        const user = await USER.create({
            username,
            email,
            fullname,
            about,
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

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {

        // check if the user exists
        const user = await USER.findOne({ email });

        if (!user) return next(CreateError("Invalid Credentials", 400));

        // check if the password is correct
        const isMatch = await verifyPIN(password, user.password);

        if (!isMatch) return next(CreateError("Invalid Credentials", 400));

        // Generate Tokens
        const { access_token, refresh_token } = GenerateToken(user);

        // update refresh token
        await USER.findByIdAndUpdate(user._id, { token: refresh_token });

        // append access_token to data
        user.access_token = access_token;

        // add refrsh token to cookie
        res.cookie('refresh_token', refresh_token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });

        res.status(200).json({
            success: true,
            data: user,
            message: "Login successful"
        })
    } catch (error) {
        next(error);
    }

}

export const GETREFRESHTOKEN = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const cookies = req.cookies
        if (!cookies?.refresh_token) return next(CreateError("Unauthorized", 401)) // unauthorized
        const refresh_token = cookies.refresh_token
        const user = await USER.findOne({ token: refresh_token })

        if (!user) {
            console.log("No user found")
            return next(CreateError("Forbidden Access", 403))
        }

        const decoded: any = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET || "")

        console.log("decoded >>>", decoded)
        // now generate a new access token
        const access_token = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET || "", { expiresIn: process.env.JWT_SECRET_EXPIRE })

        // append access token to user
        user.access_token = access_token
        res.status(201).json({
            success: true,
            data: user,
            message: "new token generated"
        })


    } catch (error) {
        next(error)
    }
}

interface MailData {
    receiver_email: string,
    subject: string,
    message: string,
    sender_name?: string,
    sender_email: string
}
const SEND_MAIL = async (mailData: MailData) => {
    // make a call to externa api to send email using fetch 
    // or axios
    mailData.sender_name = "FunChat 🚀"
    mailData.sender_email = "bentilshadrack72@gmail.com"
    try {
        const { data } = await Axios({
            method: "POST",
            url: "public/sendmail",
            data: mailData
        })
    } catch (error) {
        console.log("error >>>", error)
    }
}