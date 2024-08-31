import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../product.repository';
@Injectable()
export class ListProductsUsecase {
  constructor(private productsRepository: ProductRepository) {}

  async execute() {
    const products = await this.productsRepository.listProducts();
    return products;
  }
}
