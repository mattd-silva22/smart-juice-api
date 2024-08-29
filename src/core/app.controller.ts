import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from 'src/core/app.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
