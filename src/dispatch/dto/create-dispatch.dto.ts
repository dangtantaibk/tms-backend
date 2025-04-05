import { IsUUID, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class CreateDispatchDto {
  @IsArray()
  @IsUUID('all', { each: true })
  shipmentItemIds: string[];

  @IsOptional()
  @IsUUID()
  tripId?: string;

  @IsOptional()
  @IsBoolean()
  createNewTrip?: boolean;

  @IsOptional()
  @IsUUID()
  driverId?: string;

  @IsOptional()
  @IsUUID()
  vehicleId?: string;
}