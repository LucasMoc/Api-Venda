import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import { UserRepository } from "../infra/typeorm/repositories/UsersRepository";

export class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const users = userRepository.find();

    return users;
  };
};
