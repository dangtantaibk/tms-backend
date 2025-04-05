import { IsString, IsEnum, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Type of customer',
    enum: ['individual', 'organization'],
    example: 'individual',
  })
  @IsEnum(['individual', 'organization'])
  type: 'individual' | 'organization';

  @ApiProperty({
    description: 'Name of customer',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Tax code of customer',
    example: '0123456789',
    required: false,
  })
  @IsString()
  @IsOptional()
  taxCode?: string;

  @ApiProperty({
    description: 'Phone number of customer',
    example: '+84123456789',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description: 'Email of customer',
    example: 'customer@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Address of customer',
    example: '123 Street, City',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;
} 