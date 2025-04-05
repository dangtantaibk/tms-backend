import { IsEnum, IsOptional, IsUUID, IsArray } from 'class-validator';
import { TripStatus } from '../entities/trip.entity';

export class CreateTripDto {
  @IsUUID()
  vehicleId: string;

  @IsUUID()
  driverId: string;

  @IsArray()
  @IsUUID('all', { each: true })
  shipmentItemIds: string[];

  @IsOptional()
  @IsEnum(TripStatus)
  status?: TripStatus;
}