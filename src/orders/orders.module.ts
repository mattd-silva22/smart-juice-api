import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { FindOrderByIdUsecase } from './usecases/findOrderById.usecase';
import { UpdateOrderUsecase } from './usecases/updateOrder.usecase';
import { ListUserOrdersUsecase } from './usecases/listUserOrders.usecase';
import { DeliveryOrderUsecase } from './usecases/deliveryOrder.usecase';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateOrderUsecase } from './usecases/createOrder.usecase';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [UserModule],
  controllers: [OrdersController],
  providers: [
    PrismaService,
    OrdersService,
    OrdersRepository,
    FindOrderByIdUsecase,
    UpdateOrderUsecase,
    ListUserOrdersUsecase,
    DeliveryOrderUsecase,
    CreateOrderUsecase,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
