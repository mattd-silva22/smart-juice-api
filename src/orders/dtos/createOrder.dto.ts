import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsDate,
  IsDateString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ProductDto } from './orderProduct.dto';

export class CreateOrderDto {
  @IsUUID()
  userId: string;
  @IsUUID()
  stationId: string;
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ProductDto)
  products: { productId: string; quantity: number }[];
  @IsDateString()
  takeAwayDate: Date;
}
