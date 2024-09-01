import {
  Controller,
  Get,
  Query,
  Req,
  Res,
  UseGuards,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/users/user.service';
import { FindUserDto } from './dtos/findUser.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

import { ValidationErrorsException } from 'src/shared/responses/ValidationErrorsException';

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
    const errors = [];

    if (!query.id && !query.username) {
      errors.push('Você deve informar um id ou um username');
    }

    if (errors.length) {
      throw new ValidationErrorsException(errors);
    }

    if (query.id) {
      const user = await this.userService.findUserById(query.id);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      res.status(HttpStatus.OK).json(user);
    }

    if (query.username) {
      const user = await this.userService.findUserByUsername(query.username);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      res.status(HttpStatus.OK).json(user);
    }
  }
}
