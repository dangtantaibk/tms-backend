import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Project } from '../../projects/entities/project.entity';
  import { Customer } from '../../customers/entities/customer.entity';
  
  @Entity('ship_to')
  export class ShipTo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    code: string;
  
    @Column()
    address: string;
  
    @Column({ nullable: true })
    note?: string;
  
    @Column({ nullable: true })
    weightLimitTon?: number;
  
    @Column('simple-array', { nullable: true })
    allowedTimeSlots?: string[]; // e.g. ['X', 'Y', 'Z']
  
    @ManyToOne(() => Project, { nullable: true })
    project: Project;
  
    @ManyToOne(() => Customer, { nullable: true })
    customer: Customer;
  
    @Column({ default: true })
    isActive: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }