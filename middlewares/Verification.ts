import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
declare module "express-serve-static-core" {
	interface Request {
		user: any;
        token: string;
	}
}
export const VerifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return next({ statusCode: 401, message: "Unauthorized" });
    const token = authorization.split(" ")[1];
    try {
        const payload:any = jwt.verify(token, process.env.JWT_SECRET ||'');
        if(!payload) return next({ statusCode: 401, message: "Invalid Access Token" });

        // check expiry
        if (payload.exp < Date.now()/1000){
            return next({ statusCode: 401, message: "Token has expired" })
        }
        
        req.user = payload;
        req.token = token;
        next();
    } catch (error) {
        next(error);
    }
}
