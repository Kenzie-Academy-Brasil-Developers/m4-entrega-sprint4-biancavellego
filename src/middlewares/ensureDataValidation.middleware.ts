import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

const ensureDataValidationMiddleware =
  (schema: AnySchema) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.validate(request.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      request.body = validatedData;
      return next();
    } catch (error) {
      return response.status(400).json({
        error: error.errors,
      });
    }
  };

export default ensureDataValidationMiddleware;
