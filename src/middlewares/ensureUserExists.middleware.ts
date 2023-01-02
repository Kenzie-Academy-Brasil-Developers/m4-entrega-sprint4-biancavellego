import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";
import "dotenv/config";

const ensureUserExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.id;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (userId !== user.id) {
    throw new AppError("user not found", 404);
  }

  return next();
};

export default ensureUserExistsMiddleware;
