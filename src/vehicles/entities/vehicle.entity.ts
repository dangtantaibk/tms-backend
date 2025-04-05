import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  
  @Entity('vehicles')
  export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    licensePlate: string;
  
    @Column()
    type: string;
  
    @Column('float')
    capacityTon: number;
  
    @Column('float')
    lengthM: number;
  
    @Column('float')
    widthM: number;
  
    @Column('float')
    heightM: number;
  
    @ManyToOne(() => User, { nullable: true })
    defaultDriver: User;
  
    @Column({ default: true })
    isActive: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  