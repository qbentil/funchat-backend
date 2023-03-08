import { NextFunction, Request, Response } from "express";
import Axios from "../util/Axios";
import axios from "axios";
import { json } from "body-parser";

declare module "express-serve-static-core" {
    interface Request {
        mailfeedback: any;
    }
}
export const sendMail = async (req: Request, res: Response, next: NextFunction) => {
    const maildata = {
        to: req.body.email,
        subject: "Welcome to FunChat",
        html: `
            <p>Hi ${req.body.fullname}!,</p>
            <p>Thanks for signing up to FunChat. Your account has been created successfully.</p>

            <p>Your login details are as follows:</p>
            <p>Username: <span style='font-weight: bold'>${req.body.username}</span></p>
            <p>Password: <span style='font-weight: bold'>${req.body.password.PIN}</span></p>

            <p>Best Regards,</p>
            <p>FunChat Team</p>
        `
    }
    try {
        // send email
        // const { data } = await Axios({
        //     method: "POST",
        //     url: "public/sendmail",
        //     data: {
        //         receiver_email: maildata.to,
        //         subject: maildata.subject,
        //         message: maildata.html,
        //         sender_name:  "FunChat 🚀",
        //         sender_email: "bentilshadrack72@gmail.com",
        //     }
        // })
        const {data} = await axios.post("https://bentility-api.onrender.com/public/sendmail", {
            receiver_email: maildata.to,
            subject: maildata.subject,
            message: maildata.html,
            sender_name: "FunChat 🚀",
            sender_email: "bentilshadrack72@gmail.com",
        }, {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        })

        // console.log(">>>>>>>>>>>", data)
        req.body.mailfeedback = data;
        // res.json(data)
        next();
    } catch (error) {
        next(error);
    }
}