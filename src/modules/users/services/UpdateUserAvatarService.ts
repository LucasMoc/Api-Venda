import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import path from "path";
import fs from "fs";
import { UserRepository } from "../infra/typeorm/repositories/UsersRepository";
import uploadConfig from "@config/upload"


interface IRequest {
  userId: string;
  avatarFileName: string;
}

export class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError(`User not found`);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    };

    user.avatar = avatarFileName;

    await userRepository.save(user);

    return user;
  };
};
