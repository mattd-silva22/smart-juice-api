import { Injectable } from '@nestjs/common';
import { TUser } from 'src/users/types/user.type';
import { UserRepository } from 'src/users/user.repository';
@Injectable()
export class FindUserByUsernameUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(username: string, includePassword: boolean): Promise<TUser> {
    return await this.userRepository.findByUsername(username, includePassword);
  }
}
