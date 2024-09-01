import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../orders.repository';

@Injectable()
export class FindOrderByIdUsecase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(orderId: string) {
    return await this.ordersRepository.findOrderById(orderId);
  }
}
