import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";
import prismaClient from "../prisma";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

type Token = {
  id: string;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("Não autorizado");
    }

    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as Token;

    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("Não autorizado");
    }

    req.user = user;

    next();
  } catch (error: any) {
    return res.status(403).json({ message: error.message }); 
  }
};
