import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { ListUserOrdersUsecase } from './usecases/listUserOrders.usecase';
import { FindOrderByIdUsecase } from './usecases/findOrderById.usecase';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { UserService } from 'src/users/user.service';
import { CreateOrderUsecase } from './usecases/createOrder.usecase';
import { DeliveryOrderDto } from './dtos/deliveryOrder.dto';
import { EOrderStatus } from './types/orderStatus.enum';
import { DeliveryOrderUsecase } from './usecases/deliveryOrder.usecase';
import { UpdateOrderUsecase } from './usecases/updateOrder.usecase';
import { UpdateOrderDto } from './dtos/updateOrder.dto';

@Injectable()
export class OrdersService {
  constructor(
    private listUserOrdersUsecase: ListUserOrdersUsecase,
    private findOrderByIdUsecase: FindOrderByIdUsecase,
    private createOrderUsecase: CreateOrderUsecase,
    private deliveryOrderUsecase: DeliveryOrderUsecase,
    private updateOrderUsecase: UpdateOrderUsecase,
  ) {}

  async listUserOrders(userId: string) {
    return await this.listUserOrdersUsecase.execute(userId);
  }

  async findOrderById(orderId: string) {
    return await this.findOrderByIdUsecase.execute(orderId);
  }

  async createOrder(order: CreateOrderDto) {
    return await this.createOrderUsecase.execute(order);
  }

  async deliveryOrder(deliveryOrder: DeliveryOrderDto) {
    return await this.deliveryOrderUsecase.execute(deliveryOrder);
  }

  async updateOrder(orderId: string, orderData: UpdateOrderDto) {
    return await this.updateOrderUsecase.execute(orderId, orderData);
  }
}
