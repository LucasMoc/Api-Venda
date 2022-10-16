import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import authConfig from "@config/auth"
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import { UserRepository } from "../infra/typeorm/repositories/UsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class CreateSassionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({}, authConfig.jwt.secret as string, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token
    };
  };
};
