import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../product.repository';
@Injectable()
export class FindProductByIdUsecase {
  constructor(private productsRepository: ProductRepository) {}

  async execute(productId: string) {
    console.log('productId', productId);
    const product = await this.productsRepository.findProductById(
      productId,
      true,
    );
    return product;
  }

  test() {
    console.log('test');
  }
}
