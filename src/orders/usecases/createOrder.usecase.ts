import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/createOrder.dto';
import { OrdersRepository } from '../orders.repository';
import { UserService } from 'src/users/user.service';

@Injectable()
export class CreateOrderUsecase {
  constructor(
    private ordersRepository: OrdersRepository,
    private userService: UserService,
  ) {}

  async execute(order: CreateOrderDto) {
    const newOrder = await this.ordersRepository.createOrder(order);
    return newOrder;
  }
}
