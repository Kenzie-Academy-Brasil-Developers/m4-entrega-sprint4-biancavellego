import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ensureAuthorizationMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let token = request.headers.authorization;

  if (!token) {
    throw new AppError("Invalid token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
    //Acesso e tipagem global da request:
    request.user = {
      id: decoded.sub as string,
    };
    return next();
  });
};

export default ensureAuthorizationMiddleware;
