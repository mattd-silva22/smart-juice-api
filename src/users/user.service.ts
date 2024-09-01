import { Injectable, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async findUserByUsername(
    username: string,
    includePassword: boolean = false,
  ): Promise<TUser> {
    return await this.findUserByUsernameUsecase.execute(
      username,
      includePassword,
    );
  }
}
