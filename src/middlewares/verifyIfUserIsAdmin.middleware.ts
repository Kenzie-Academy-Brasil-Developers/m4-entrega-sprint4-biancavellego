import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

const verifyIfUserIsAdminMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.user.id;
  const userRepository = await AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (user.isAdm === false) {
    throw new AppError("Access denied. Missing admin permissions", 403);
  }

  return next();
};

export default verifyIfUserIsAdminMiddleware;
