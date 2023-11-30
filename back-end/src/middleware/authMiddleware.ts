import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";
import prismaClient from "../prisma";
import jwt from "jsonwebtoken";

type Token = {
  id: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error("Não autorizado");
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as Token;

  const user = await prismaClient.user.findFirst({
    where: {
      id,
    }
  })

  if(!user) {
    throw new Error("Não autorizado");
  }
  
  req.user = user

  next();
};
