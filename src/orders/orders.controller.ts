import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { OrdersService } from './orders.service';
import { Request, Response } from 'express';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { DeliveryOrderDto } from './dtos/deliveryOrder.dto';
import { UpdateOrderDto } from './dtos/updateOrder.dto';
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
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':orderId')
  async findOrderById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('orderId', ParseUUIDPipe) orderId,
  ) {
    const data = await this.ordersService.findOrderById(orderId);
    if (!data) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(HttpStatus.OK).json(data);
  }

  @Post()
  async createOrder(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateOrderDto,
  ) {
    const data = await this.ordersService.createOrder(body);
    res.status(HttpStatus.CREATED).json(data);
  }

  @Patch('delivery')
  async deliveryOrder(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: DeliveryOrderDto,
  ) {
    await this.ordersService.deliveryOrder(body);
    res.status(HttpStatus.ACCEPTED).send();
  }

  @Patch(':orderId')
  async updateOrder(
    @Req() req: Request,
    @Res() res: Response,
    @Param('orderId', ParseUUIDPipe) orderId,
    @Body() orderData: UpdateOrderDto,
  ) {
    const data = await this.ordersService.updateOrder(orderId, orderData);
    res.status(HttpStatus.ACCEPTED).send(data);
  }
}
