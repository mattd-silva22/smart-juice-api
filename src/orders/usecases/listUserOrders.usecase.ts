import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../orders.repository';
@Injectable()
export class ListUserOrdersUsecase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(userId: string) {
    return await this.ordersRepository.listUserOrders(userId);
  }
}
