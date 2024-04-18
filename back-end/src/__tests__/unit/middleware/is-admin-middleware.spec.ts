import { NextFunction, Request, Response } from "express";
import { isAdminMiddleware } from "../../../middleware/isAdminMiddleware";
import prismaClient from "../../../prisma";
import jwt from "jsonwebtoken";

jest.mock("../../../prisma", () => ({
  __esModule: true,
  default: {
    user: {
      findFirst: jest.fn().mockImplementation((options) => {
        console.log("options", options)
        if (options.where && options.where.role_id === "36a664f4-3f50-4575-b96b-c4f74b91f5cg") {
            return { id: "some_user_id", role_id: "36a664f4-3f50-4575-b96b-c4f74b91f5cg" };
          } else {
            return null;
          }
      }),
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

  it("should call next if user is authenticated and user role to equals admin", async () => {
    const token = "some_valid_token";
    req.headers = { authorization: `Bearer ${token}` };

    const decodedToken = { id: "some_user_id" };
    (jwt.verify as jest.Mock).mockReturnValue(decodedToken);
    console.log("decodedToken>>>", decodedToken)

    const user = { id: "some_user_id", role_id: "36a664f4-3f50-4575-b96b-c4f74b91f5cg" };
    const test = (prismaClient.user.findFirst as jest.Mock).mockResolvedValue(user);

    await isAdminMiddleware(req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual(user);
  });
});
