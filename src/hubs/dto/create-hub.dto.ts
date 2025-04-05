import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateHubDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsUUID()
  projectId?: string;
}