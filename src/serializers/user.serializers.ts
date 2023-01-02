import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUserRequest,
  IUserLogin,
  IUserUpdate,
  IUser,
} from "../interfaces/users";

const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().required(),
});

const userWithoutPasswordSerializer: SchemaOf<IUser> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().notRequired(),
  isAdm: yup.boolean().notRequired(),
  isActive: yup.boolean().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
});

const listUsersWithoutPasswordSerializer: SchemaOf<IUser[]> = yup.array(
  userWithoutPasswordSerializer
);

const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired(),
});

const userLoginSerializer: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export {
  userSerializer,
  userWithoutPasswordSerializer,
  listUsersWithoutPasswordSerializer,
  userUpdateSerializer,
  userLoginSerializer,
};
