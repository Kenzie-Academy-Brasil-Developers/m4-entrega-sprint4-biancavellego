import AppDataSource from "../../data-source";
import { IUser, IUserUpdate } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { userWithoutPasswordSerializer } from "../../serializers/user.serializers";
import { AppError } from "../../errors/AppError";

const updateUserService = async (
  loggedUserId: string,
  paramsUserId: string,
  userData: IUserUpdate
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: loggedUserId });

  if (loggedUserId !== paramsUserId && user.isAdm === false) {
    throw new AppError("Missing admin permissions", 401);
  }

  const userToUpdate: IUserUpdate = await userRepository.findOneBy({
    id: paramsUserId,
  });

  const updatedUser = userRepository.create({
    ...userToUpdate,
    ...userData,
  });

  await userRepository.save(updatedUser);

  const updatedUserWithoutPassword =
    await userWithoutPasswordSerializer.validate(updatedUser, {
      stripUnknown: true,
    });

  console.log(updatedUserWithoutPassword);

  return updatedUserWithoutPassword;
};

export default updateUserService;
