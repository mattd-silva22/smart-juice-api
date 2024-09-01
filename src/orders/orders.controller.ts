import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { OrdersService } from './orders.service';
import { Request, Response } from 'express';
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('user/:userId')
  async listUserOrders(
    @Req() req: Request,
    @Res() res: Response,
    @Param('userId', ParseUUIDPipe) userId,
  ) {
    const data = await this.ordersService.listUserOrders(userId);
    res.status(200).json(data);
  }
}
