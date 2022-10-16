import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../infra/typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "../infra/typeorm/repositories/UserTokenRepository";


interface IRequest {
  email: string;
}

export default class SendForgotPassowordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const userToken = await userTokenRepository.generate(user.id);


  };
};
