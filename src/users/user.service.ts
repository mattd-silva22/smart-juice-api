import { Injectable } from '@nestjs/common';
import { FindUserByIdUsecase } from './usecases/findUserById.usecase';
import { FindUserByUsernameUsecase } from './usecases/findUserByUsername.usecase';
import { TUser } from './types/user.type';

@Injectable()
export class UserService {
  constructor(
    private findUserByIdUsecase: FindUserByIdUsecase,
    private findUserByUsernameUsecase: FindUserByUsernameUsecase,
  ) {}
  async findUserById(id: string) {
    const user = await this.findUserByIdUsecase.execute(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findUserByUsername(
    username: string,
    includePassword: boolean = false,
  ): Promise<TUser> {
    const user = await this.findUserByUsernameUsecase.execute(
      username,
      includePassword,
    );
    if (!user) {
      return user as TUser;
    }

    return user;
  }
}
