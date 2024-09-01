import { PrismaService } from 'src/shared/database/prisma.service';
import { ProductQueryDto } from './dtos/productQuery.dto';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findProductById(productId: string, includeRecipe: boolean = false) {
    return await this.prismaService.products.findUnique({
      where: { id: productId },
      include: includeRecipe
        ? {
            recipe: {
              include: { ingredient: true },
            },
          }
        : undefined,
    });
  }

  async searchProducts(query: ProductQueryDto) {
    const { name = '', description = '' } = query;
    return await this.prismaService.products.findMany({
      where: {
        name: {
          contains: name,
        },
        description: {
          contains: description,
        },
      },
    });
  }

  async listProducts() {
    return await this.prismaService.products.findMany();
  }
}
