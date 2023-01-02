import { Request, Response } from "express";

//Interfaces:
import { IUserRequest, IUserLogin, IUserUpdate } from "../interfaces/users";

//Services:
import createUserService from "../services/users/createUser.service";
import userLoginService from "../services/users/userLogin.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUser.service";

//============================================================CREATE USER==================================================================
export const createUserController = async (
  request: Request,
  response: Response
) => {
  const userData: IUserRequest = request.body;
  const newUser = await createUserService(userData);
  return response.status(201).json(newUser);
};
//============================================================USER LOGIN====================================================================
export const userLoginController = async (
  request: Request,
  response: Response
) => {
  const loginData: IUserLogin = request.body;
  const token = await userLoginService(loginData);
  return response.json({ token });
};
//============================================================LIST USERS====================================================================
export const listUsersController = async (
  request: Request,
  response: Response
) => {
  const allUsers = await listUsersService();
  return response.status(200).json(allUsers);
};
//============================================================UPDATE USER====================================================================
export const updateUserController = async (
  request: Request,
  response: Response
) => {
  const userData: IUserUpdate = request.body;
  const userToUpdate = await updateUserService(
    request.user.id,
    request.params.id,
    userData
  );
  return response.status(200).json(userToUpdate);
};
//============================================================DELETE USER=====================================================================
export const deleteUserController = async (
  request: Request,
  response: Response
) => {
  const deletedUser = await deleteUserService(request.params.id);
  return response.status(204).json({ message: "user deleted" });
};
