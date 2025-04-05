
import { IsOptional, IsString, IsUUID, IsNumber, IsArray } from 'class-validator';

export class CreateShipToDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsNumber()
  weightLimitTon?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allowedTimeSlots?: string[];

  @IsOptional()
  @IsUUID()
  projectId?: string;

  @IsOptional()
  @IsUUID()
  customerId?: string;
}
