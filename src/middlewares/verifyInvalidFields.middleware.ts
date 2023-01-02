import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const verifyInvalidFieldsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userData = request.body;

  let invalidField = false;

  for (let key in userData) {
    if (key === "isAdm" || key === "isActive" || key === "id") {
      invalidField = true;
    }
  }

  if (invalidField === true) {
    throw new AppError("invalid field value", 401);
  }

  return next();
};

export default verifyInvalidFieldsMiddleware;
