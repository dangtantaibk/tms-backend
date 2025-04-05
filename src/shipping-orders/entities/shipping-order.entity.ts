import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Customer } from '../../customers/entities/customer.entity';
  import { Project } from '../../projects/entities/project.entity';
  import { ShipmentItem } from '../../shipment-items/entities/shipment-item.entity';
  
  @Entity('shipping_orders')
  export class ShippingOrder {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    code: string;
  
    @Column({ nullable: true })
    expectedPickupTime: Date;
  
    @Column({ nullable: true })
    expectedDeliveryTime: Date;
  
    @ManyToOne(() => Customer, { nullable: true })
    customer: Customer;
  
    @ManyToOne(() => Project, { nullable: true })
    project: Project;
  
    @ManyToMany(() => ShipmentItem)
    @JoinTable()
    shipmentItems: ShipmentItem[];
  
    @Column({ default: true })
    isActive: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }