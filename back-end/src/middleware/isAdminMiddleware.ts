import { NextFunction, Request, Response } from "express";

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // console.log("req:::", req)
    next();
}