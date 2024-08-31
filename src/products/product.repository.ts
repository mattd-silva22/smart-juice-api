import { PrismaService } from 'src/shared/database/prisma.service';

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

  async searchProduct(name: string) {
    return await this.prismaService.products.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }
}
