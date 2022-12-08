import { NextFunction, Request, Response } from "express";

import CreateError from "../util/Error";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
        user: any;
        token: string;
    }
}
export const VerifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return next(CreateError("Access token is required", 401));
    const token: string = authorization.split(" ")[1];
    try {
        const payload: any = jwt.verify(token, process.env.JWT_SECRET || '');
        if (!payload) return next(CreateError("Invalid access token", 401));

        // check expiry
        if (payload.exp < Date.now() / 1000) {
            return next(CreateError("Access token expired", 401))
        }

        req.user = payload;
        req.token = token;
        next();
    } catch (error) {
        next(error);
    }
}

export const VerifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    // Throw error if not Auth token
    if (!authorization) return next(CreateError("Unauthorized Access to Refresh", 401))

    const token: string = authorization.split(" ")[1];

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET || '')
        if (!decoded) return next(CreateError("Invalid Refresh Token", 401))
        // check expiry
        if (decoded.exp < Date.now() / 1000) {
            return next(CreateError("Access token expired", 401))
        }

        req.user = decoded;
        req.token = token;
        next();
    } catch (e: any) {
        next(e)
    }

}