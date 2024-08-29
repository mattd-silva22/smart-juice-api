import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { FindUserDto } from './dtos/findUser.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findUser(@Query() query: FindUserDto) {
    if (query.id) {
      return this.userService.findUserById(query.id);
    }

    if (query.username) {
      return this.userService.findUserByUsername(query.username);
    }
  }
}
