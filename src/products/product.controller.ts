import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProductRepository } from './product.repository';

import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ProductService } from './product.service';
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async listProducts() {
    return this.productService.listProducts();
  }

  @Get(':id')
  async findProductById(@Param('id') id: string) {
    console.log('id', id);
    return await this.productService.findProductById(id);
  }
}
