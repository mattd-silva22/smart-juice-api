import { Module } from '@nestjs/common';
import { FindUserByIdUsecase } from './usecases/findUserById.usecase';
import { FindUserByUsernameUsecase } from './usecases/findUserByUsername.usecase';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PrismaService } from 'src/shared/database/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    UserRepository,
    UserService,
    FindUserByIdUsecase,
    FindUserByUsernameUsecase,
  ],
  exports: [UserService],
})
export class UserModule {}
