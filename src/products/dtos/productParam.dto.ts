import { IsString, IsUUID } from 'class-validator';

export class ProductParamDto {
  @IsString()
  @IsUUID()
  productId: string;
}
