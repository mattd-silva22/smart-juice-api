import { Injectable } from '@nestjs/common';
import { TUser } from 'src/users/types/user.type';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class FindUserByIdUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<TUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
