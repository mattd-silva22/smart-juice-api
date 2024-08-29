import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string) {
    return await this.prismaService.users.findUnique({
      where: { id },
    });
  }

  public async findByUsername(username: string) {
    return await this.prismaService.users.findUnique({
      where: { username },
    });
  }
}
