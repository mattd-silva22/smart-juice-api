import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeliveryOrderDto } from '../dtos/deliveryOrder.dto';
import { FindOrderByIdUsecase } from './findOrderById.usecase';
import { EOrderStatus } from '../types/orderStatus.enum';
import { OrdersRepository } from '../orders.repository';

@Injectable()
export class DeliveryOrderUsecase {
  constructor(
    private findOrderByIdUsecase: FindOrderByIdUsecase,
    private orderRepository: OrdersRepository,
  ) {}

  async execute(deliveryOrder: DeliveryOrderDto) {
    const order = await this.findOrderByIdUsecase.execute(
      deliveryOrder.orderId,
    );

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (!(order.status !== EOrderStatus.DELIVERED)) {
      throw new ConflictException('Order already delivered');
    }

    if (order.stationId != deliveryOrder.stationId) {
      throw new BadRequestException('Order not from this station');
    }
    const now = new Date();
    const oneHourBefore = new Date(now.getTime() - 60 * 60 * 1000);
    const oneHourAfter = new Date(now.getTime() + 60 * 60 * 1000);

    const isInRange =
      order.takeAwayDate >= oneHourBefore && order.takeAwayDate <= oneHourAfter;

    if (isInRange) {
      throw new BadRequestException(
        'You can only deliver the order within 1 hour of the take away date',
      );
    }

    return await this.orderRepository.deliveryOrder(deliveryOrder.orderId);
  }
}
