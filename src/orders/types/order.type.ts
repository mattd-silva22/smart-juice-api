import { TProduct } from 'src/products/types/product.type';
import { EOrderStatus } from './orderStatus.enum';

export type TOrder = {
  id: string;
  userId: string;
  status: EOrderStatus;
  stationId: string;
  products: TProduct;
  createAt: Date;
  updateAt: Date;
};
