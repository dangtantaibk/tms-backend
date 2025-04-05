import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateShipmentItemDto {
  @IsString()
  name: string;

  @IsString()
  soCode: string;

  @IsString()
  shipmentCode: string;

  @IsOptional()
  @IsString()
  originAddress?: string;

  @IsOptional()
  @IsUUID()
  customerId?: string;

  @IsOptional()
  @IsUUID()
  shipToId?: string;

  @IsOptional()
  @IsUUID()
  projectId?: string;
}
