import { Router } from "express";

//Controllers:
import { userLoginController } from "../controllers/user.controller";

//Middlewares:
import ensureDataValidationMiddleware from "../middlewares/ensureDataValidation.middleware";

//Serializers:
import { userLoginSerializer } from "../serializers/user.serializers";

//============================================================ROUTES========================================================================
const loginRoute = Router();

loginRoute.post(
  "",
  ensureDataValidationMiddleware(userLoginSerializer),
  userLoginController
);

export default loginRoute;
