import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateOrderDto } from '../dtos/updateOrder.dto';
import { OrdersRepository } from '../orders.repository';
import { FindOrderByIdUsecase } from './findOrderById.usecase';

@Injectable()
export class UpdateOrderUsecase {
  constructor(
    private findOrderByIdUsecase: FindOrderByIdUsecase,
    private orderRepository: OrdersRepository,
  ) {}

  async execute(orderId: string, orderData: UpdateOrderDto) {
    const order = await this.findOrderByIdUsecase.execute(orderId);
    const now = new Date();
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status === 'DELIVERED') {
      throw new BadRequestException('Order already delivered');
    }

    if (orderData.takeAwayDate < now) {
      throw new BadRequestException(
        'You cannot change the take away date to a past date',
      );
    }

    return this.orderRepository.updateOrder(orderId, orderData);
  }
}
