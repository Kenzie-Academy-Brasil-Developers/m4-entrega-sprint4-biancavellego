import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users";
import { listUsersWithoutPasswordSerializer } from "../../serializers/user.serializers";

const listUsersService = async (): Promise<IUser[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const userList = await userRepository.find({ withDeleted: true });

  const userListWithoutPassword =
    await listUsersWithoutPasswordSerializer.validate(userList, {
      stripUnknown: true,
    });

  return userListWithoutPassword;
};

export default listUsersService;
