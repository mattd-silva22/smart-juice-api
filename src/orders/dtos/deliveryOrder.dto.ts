import { IsUUID } from 'class-validator';

export class DeliveryOrderDto {
  @IsUUID()
  orderId: string;
  @IsUUID()
  stationId: string;
}
