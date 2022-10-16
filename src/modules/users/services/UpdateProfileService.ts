import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import path from "path";
import fs from "fs";
import { UserRepository } from "../infra/typeorm/repositories/UsersRepository";
import uploadConfig from "@config/upload"
import { compare, hash } from "bcryptjs";


interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  newPassword?: string;
}

export class UpdateProfileService {
  public async execute({ user_id, name, password, newPassword, email }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError(`User not found`);
    }

    const emailExsist = await userRepository.findByEmail(email)
    if (emailExsist && emailExsist.id != user.id) {
      throw new AppError('Email address already used.');
    }

    if (password && !newPassword) {

      throw new AppError('Old password is required.', 401);
    }

    if (password && newPassword) {
      const passwordConfirmed = await compare(password, user.password);

      if (!passwordConfirmed) {
        throw new AppError('Old password does not match.', 401);
      }

      const hashedPassword = await hash(newPassword, 8);

      user.password = hashedPassword;
    }

    user.name = name;
    user.email = email;

    await userRepository.save(user);

    return user;
  };
};
