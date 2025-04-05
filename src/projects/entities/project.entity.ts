import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Customer } from '../../customers/entities/customer.entity';
  
  @Entity('projects')
  export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    code: string;
  
    @Column({ nullable: true })
    address: string;
  
    // @ManyToOne(() => Customer, (customer) => customer.projects, { nullable: true })
    customer: Customer;
  
    @Column({ default: true })
    isActive: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  