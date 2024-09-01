import { PrismaService } from 'src/shared/database/prisma.service';
import { EOrderStatus } from './types/orderStatus.enum';
import { Injectable } from '@nestjs/common';
@Injectable()
export class OrdersRepository {
  constructor(private prismaService: PrismaService) {}

  createOrder(order: any) {
    // Implement this method
  }

  findOrderById(orderId: string) {
    return this.prismaService.orders.findUnique({
      where: { id: orderId },
    });
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

  updateOrder(order: any) {
    // Implement this method
  }

  async deliveryOrder(orderId: string) {
    return await this.prismaService.orders.update({
      where: { id: orderId },
      data: { status: EOrderStatus.DELIVERED },
    });
  }
}
