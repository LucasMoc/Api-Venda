import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";


interface IRequest{
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({name, email, password}: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const emailExsist = await userRepository.findByEmail(email);

    if(emailExsist){
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  };
};
