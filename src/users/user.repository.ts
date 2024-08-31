import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string) {
    return await this.prismaService.users.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        firstName: true,
        cpf: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  public async findByUsername(username: string, includePassword: boolean) {
    return await this.prismaService.users.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        firstName: true,
        cpf: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        password: includePassword,
      },
    });
  }
}
