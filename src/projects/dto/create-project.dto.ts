import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsUUID()
  customerId?: string;
}