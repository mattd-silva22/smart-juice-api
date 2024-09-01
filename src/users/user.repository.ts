import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { ErrorResponse } from 'src/shared/responses/ErrorResponse';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string) {
    try {
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
    } catch (dbError) {
      throw new ErrorResponse(
        'Erro na camada de banco de dados',
        dbError.message,
      );
    }
  }

  public async findByUsername(username: string, includePassword: boolean) {
    try {
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
    } catch (dbError) {
      throw new ErrorResponse(
        'Erro na camada de banco de dados',
        dbError.message,
      );
    }
  }
}
