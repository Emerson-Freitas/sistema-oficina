import { NextFunction, Request, Response } from "express";
import { authMiddleware } from "../../../middleware/authMiddleware";
import prismaClient from "../../../prisma";
import jwt from "jsonwebtoken";

jest.mock("../../../prisma", () => ({
  __esModule: true,
  default: {
    user: {
      findFirst: jest.fn(),
    },
  },
}));

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

describe("Testing middleware with Authentication JWT", () => {
  let req: Partial<Request> = {};
  let res: Partial<Response> = {};
  let next: jest.Mock<NextFunction, any>;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next if user is authenticated", async () => {
    const token = "some_valid_token";
    req.headers = { authorization: `Bearer ${token}` };

    const decodedToken = { id: "some_user_id" };
    (jwt.verify as jest.Mock).mockReturnValue(decodedToken);

    const user = { id: "some_user_id" };
    (prismaClient.user.findFirst as jest.Mock).mockResolvedValue(user);

    await authMiddleware(req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual(user);
  });
});
