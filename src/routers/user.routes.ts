import { Router } from "express";

//Controllers:
import {
  createUserController,
  listUsersController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller";

//Middlewares:
import ensureAuthorizationMiddleware from "../middlewares/ensureAuthorization.middleware";
import ensureDataValidationMiddleware from "../middlewares/ensureDataValidation.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import ensureUserIsActiveMiddleware from "../middlewares/ensureUserIsActive.middleware";
import verifyIfUserIsAdminMiddleware from "../middlewares/verifyIfUserIsAdmin.middleware";
import verifyValidIdsMiddleware from "../middlewares/verifyValidIds.middleware";
import verifyInvalidFieldsMiddleware from "../middlewares/verifyInvalidFields.middleware";

//Serializers:
import {
  userSerializer,
  userUpdateSerializer,
} from "../serializers/user.serializers";

//============================================================ROUTES========================================================================
const usersRoutes = Router();

//Create User Route:
usersRoutes.post(
  "",
  ensureDataValidationMiddleware(userSerializer),
  createUserController
);

//List Users Route:
usersRoutes.get(
  "",
  ensureAuthorizationMiddleware,
  verifyIfUserIsAdminMiddleware,
  listUsersController
);

//Update User Route:
usersRoutes.patch(
  "/:id",
  verifyInvalidFieldsMiddleware,
  ensureDataValidationMiddleware(userUpdateSerializer),
  ensureAuthorizationMiddleware,
  verifyValidIdsMiddleware,
  ensureUserExistsMiddleware,
  updateUserController
);

//Delete User Route:
usersRoutes.delete(
  "/:id",
  ensureUserIsActiveMiddleware,
  verifyValidIdsMiddleware,
  ensureAuthorizationMiddleware,
  ensureUserExistsMiddleware,
  verifyIfUserIsAdminMiddleware,
  deleteUserController
);

export default usersRoutes;
