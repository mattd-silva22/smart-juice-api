import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [PrismaService],
  exports: [ProductService],
})
export class ProductModule {}
