import { EntityRepository, Repository } from 'typeorm';
import UserTokens from '../entities/UserToken'

@EntityRepository(UserTokens)
export class UserTokensRepository extends Repository<UserTokens>{
  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const userTokens = await this.findOne({
      where: { token }
    });

    return userTokens;
  }

  public async findByUser(user_id: string): Promise<UserTokens | undefined> {
    const userToken = await this.findOne({
      where: { user_id }
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserTokens | undefined> {

    const existUserToken = await this.findByUser(user_id);

    if (existUserToken) {
      await this.delete(existUserToken.id);
    };

    const userToken = await this.create({
      user_id
    });

    await this.save(userToken);

    return userToken;
  }
}
