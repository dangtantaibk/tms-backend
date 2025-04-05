import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Customer } from '../../customers/entities/customer.entity';
  import { ShipTo } from '../../ship-to/entities/shipto.entity';
  import { Project } from '../../projects/entities/project.entity';
  
  @Entity('shipment_items')
  export class ShipmentItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    soCode: string;
  
    @Column()
    shipmentCode: string;
  
    @Column({ nullable: true })
    expectedDeliveryTime: Date;
  
    @Column({ nullable: true })
    originAddress: string;
  
    @ManyToOne(() => Customer, { nullable: true })
    customer: Customer;
  
    @ManyToOne(() => ShipTo, { nullable: true })
    shipTo: ShipTo;
  
    @ManyToOne(() => Project, { nullable: true })
    project: Project;
  
    @Column({ default: true })
    isActive: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  