import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

const verifyValidIdsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let paramsUserId = request.params.id;
  const userRepository = AppDataSource.getRepository(User);

  const regexExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!regexExp.test(paramsUserId)) {
    throw new AppError("invalid id", 404);
  }

  const user = await userRepository.exist({
    where: { id: paramsUserId },
  });

  if (user === false) {
    throw new AppError("Invalid id", 404);
  }

  return next();
};

export default verifyValidIdsMiddleware;
