import { Injectable } from '@nestjs/common';
import { FindUserByIdUsecase } from './usecases/findUserById.usecase';
import { FindUserByUsernameUsecase } from './usecases/findUserByUsername.usecase';
import { TUser } from './types/user.type';
import { ErrorResponse } from 'src/shared/responses/ErrorResponse';

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
    try {
      return await this.findUserByUsernameUsecase.execute(
        username,
        includePassword,
      );
    } catch (error) {
      throw new ErrorResponse('Erro ao buscar usuário', error.message);
    }
  }
}
