import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { ListUserOrdersUsecase } from './usecases/listUserOrders.usecase';

@Injectable()
export class OrdersService {
  constructor(private listUserOrdersUsecase: ListUserOrdersUsecase) {}

  async listUserOrders(userId: string) {
    return await this.listUserOrdersUsecase.execute(userId);
  }

  async findOrderById(orderId: string) {}

  async deliveryOrder(orderId: string) {}

  async updateOrder(orderId: string) {}
}
