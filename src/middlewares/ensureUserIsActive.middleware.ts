import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

const ensureUserIsActiveMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.id;
  const userRepository = await AppDataSource.getRepository(User);
  const innactiveUsers = await userRepository.find({
    where: { isActive: false, id: userId },
    withDeleted: true,
  });

  if (innactiveUsers.length > 0) {
    throw new AppError("User no longer active", 400);
  }

  return next();
};

export default ensureUserIsActiveMiddleware;
