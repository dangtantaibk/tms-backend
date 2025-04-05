
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  licensePlate: string;

  @IsString()
  type: string;

  @IsNumber()
  capacityTon: number;

  @IsNumber()
  lengthM: number;

  @IsNumber()
  widthM: number;

  @IsNumber()
  heightM: number;

  @IsOptional()
  @IsUUID()
  defaultDriverId?: string;
}
