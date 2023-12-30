import { NextFunction, Request, Response } from "express";

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    next();
}