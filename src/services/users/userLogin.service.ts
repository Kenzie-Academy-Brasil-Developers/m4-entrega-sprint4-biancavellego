import AppDataSource from "../../data-source";
import { IUserLogin } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import "dotenv/config";

const userLoginService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email: email });

  if (!user.email) {
    throw new AppError("invalid email or password", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("invalid email or password", 403);
  }

  const token = jwt.sign({}, process.env.SECRET_KEY, {
    subject: String(user.id),
    expiresIn: "24h",
  });

  return token;
};

export default userLoginService;
