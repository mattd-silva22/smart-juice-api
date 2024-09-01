import { IsDateString, IsEnum, IsUUID } from 'class-validator';
import { EOrderStatus } from '../types/orderStatus.enum';
import { Type } from 'class-transformer';

export class UpdateOrderDto {
  @IsEnum(EOrderStatus)
  status: EOrderStatus;
  @IsUUID()
  stationId: string;
  @IsDateString()
  takeAwayDate: Date;
}
