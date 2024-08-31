import { Injectable } from '@nestjs/common';
import { ProductQueryDto } from '../dtos/productQuery.dto';
import { ProductRepository } from '../product.repository';
@Injectable()
export class SearchProductUseCase {
  constructor(private productsRepository: ProductRepository) {}

  execute(query: ProductQueryDto) {
    const products = this.productsRepository.searchProducts(query);
    return products;
  }
}
