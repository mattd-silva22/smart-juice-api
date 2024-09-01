import { Injectable } from '@nestjs/common';
import { FindProductByIdUsecase } from './usecases/findProductById.usecase';
import { ListProductsUsecase } from './usecases/listProducts.usecase';
import { ProductQueryDto } from './dtos/productQuery.dto';
import { SearchProductUsecase } from './usecases/searchProduct.usecase';
@Injectable()
export class ProductService {
  constructor(
    private listProductsUsecase: ListProductsUsecase,
    private findProductByIdUsecase: FindProductByIdUsecase,
    private searchProductsUsecase: SearchProductUsecase,
  ) {}

  async listProducts() {
    return this.listProductsUsecase.execute();
  }

  async findProductById(id: string) {
    return await this.findProductByIdUsecase.execute(id);
  }

  async searchProducts(query: ProductQueryDto) {
    return await this.searchProductsUsecase.execute(query);
  }
}
