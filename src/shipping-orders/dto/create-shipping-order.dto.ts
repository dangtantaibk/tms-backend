import { IsOptional, IsString, IsUUID, IsArray } from 'class-validator';

export class CreateShippingOrderDto {
  @IsString()
  code: string;

  @IsOptional()
  expectedPickupTime?: Date;

  @IsOptional()
  expectedDeliveryTime?: Date;

  @IsOptional()
  @IsUUID()
  customerId?: string;

  @IsOptional()
  @IsUUID()
  projectId?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  shipmentItemIds?: string[];
}
