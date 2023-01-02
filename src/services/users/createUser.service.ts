import AppDataSource from "../../data-source";
import { IUser, IUserRequest } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { userWithoutPasswordSerializer } from "../../serializers/user.serializers";
import { AppError } from "../../errors/AppError";

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const userAlreadyExists = await userRepository.exist({
    where: { email: userData.email },
  });

  if (userAlreadyExists) {
    throw new AppError("User already exists", 400);
  }

  const newUser = userRepository.create(userData);
  await userRepository.save(newUser);

  const userWithoutPassword = await userWithoutPasswordSerializer.validate(
    newUser,
    {
      stripUnknown: true,
    }
  );

  return userWithoutPassword;
};

export default createUserService;
