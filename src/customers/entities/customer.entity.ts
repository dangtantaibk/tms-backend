import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the customer',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  id: string;

  @Column({
    type: 'enum',
    enum: ['individual', 'organization'],
  })
  @ApiProperty({
    description: 'Type of customer',
    enum: ['individual', 'organization'],
    example: 'individual',
  })
  type: 'individual' | 'organization';

  @Column()
  @ApiProperty({
    description: 'Name of customer',
    example: 'John Doe',
  })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Tax code of customer',
    example: '0123456789',
    required: false,
  })
  taxCode: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Phone number of customer',
    example: '+84123456789',
    required: false,
  })
  phone: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Email of customer',
    example: 'customer@example.com',
    required: false,
  })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Address of customer',
    example: '123 Street, City',
    required: false,
  })
  address: string;

  @Column({
    type: 'enum',
    enum: ['active', 'closed'],
    default: 'active'
  })
  @ApiProperty({
    description: 'Status of customer',
    enum: ['active', 'closed'],
    example: 'active',
  })
  status: 'active' | 'closed';

  @CreateDateColumn()
  @ApiProperty({
    description: 'Creation date',
    example: '2024-04-03T12:00:00Z',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'Last update date',
    example: '2024-04-03T12:00:00Z',
  })
  updatedAt: Date;
} 