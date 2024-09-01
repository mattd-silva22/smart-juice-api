import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { FindProductByIdUsecase } from './usecases/findProductById.usecase';
import { ListProductsUsecase } from './usecases/listProducts.usecase';
import { SearchProductUsecase } from './usecases/searchProduct.usecase';
import { ProductRepository } from './product.repository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    PrismaService,
    ProductRepository,
    SearchProductUsecase,
    ListProductsUsecase,
    FindProductByIdUsecase,
    ProductService,
  ],
  exports: [ProductService],
})
export class ProductModule {}
