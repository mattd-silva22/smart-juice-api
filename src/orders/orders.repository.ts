import { PrismaService } from 'src/shared/database/prisma.service';
import { EOrderStatus } from './types/orderStatus.enum';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { UpdateOrderDto } from './dtos/updateOrder.dto';
@Injectable()
export class OrdersRepository {
  constructor(private prismaService: PrismaService) {}

  async createOrder(order: CreateOrderDto) {
    const newOrder = await this.prismaService.orders.create({
      data: {
        userId: order.userId,
        stationId: order.stationId,
        takeAwayDate: order.takeAwayDate,
        products: {
          create: order.products.map((product) => ({
            product: { connect: { id: product.productId } },
          })),
        },
      },
    });

    return newOrder;
  }

  findOrderById(orderId: string) {
    const order = this.prismaService.orders.findUnique({
      where: { id: orderId },
      include: {
        products: {
          include: {
            product: {
              select: { id: true, name: true, price: true },
            },
          },
        },
      },
    });

    return {
      ...order, // Inclui todos os dados do pedido
      products: order.products, // Extrai e estrutura os produtos
    };
  }

  async listUserOrders(userId: string) {
    const orders = await this.prismaService.orders.findMany({
      where: { userId: userId },
      include: {
        products: {
          include: {
            product: {
              select: { id: true, name: true, price: true },
            },
          },
        },
      },
    });

    return orders.map((order) => ({
      ...order, // Inclui todos os dados do pedido
      products: order.products.map((productOrder) => productOrder.product), // Extrai e estrutura os produtos
    }));
  }

  updateOrder(orderId: string, order: UpdateOrderDto) {
    return this.prismaService.orders.update({
      where: { id: orderId },
      data: {
        status: order.status,
        takeAwayDate: order.takeAwayDate,
        stationId: order.stationId,
      },
    });
  }
  async deliveryOrder(orderId: string) {
    return await this.prismaService.orders.update({
      where: { id: orderId },
      data: { status: EOrderStatus.DELIVERED },
    });
  }
}
