import { Injectable } from '@nestjs/common';
import { FindProductByIdUsecase } from './usecases/findProductById.usecase';
import { ListProductsUsecase } from './usecases/listProducts.usecase';
@Injectable()
export class ProductService {
  constructor(
    private listProductsUsecase: ListProductsUsecase,
    private findProductByIdUsecase: FindProductByIdUsecase,
  ) {}

  async listProducts() {
    return this.listProductsUsecase.execute();
  }

  async findProductById(id: string) {
    console.log('id2', id);
    return await this.findProductByIdUsecase.execute(id);
  }
}
