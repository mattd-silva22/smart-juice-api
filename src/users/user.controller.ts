import {
  Controller,
  Get,
  Query,
  Req,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/users/user.service';
import { FindUserDto } from './dtos/findUser.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ErrorResponse } from 'src/shared/responses/ErrorResponse';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findUser(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: FindUserDto,
  ) {
    const erros = [];

    if (!query.id && !query.username) {
      erros.push('Você deve informar um id ou um username');
    }

    if (erros.length) {
      const response = new ErrorResponse('Erro ao buscar usuário', erros);
      res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (query.id) {
      const user = await this.userService.findUserById(query.id);

      if (!user) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json(new ErrorResponse('Usuário não encontrado'));
      }

      res.status(HttpStatus.OK).json(user);
    }

    if (query.username) {
      const user = await this.userService.findUserByUsername(query.username);

      if (!user) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json(new ErrorResponse('Usuário não encontrado'));
      }

      res.status(HttpStatus.OK).json(user);
    }
  }
}
