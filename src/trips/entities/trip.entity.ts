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
  import { User } from '../../users/entities/user.entity';
  import { Vehicle } from '../../vehicles/entities/vehicle.entity';
  import { ShipmentItem } from '../../shipment-items/entities/shipment-item.entity';
  
  export enum TripStatus {
    DRAFT = 'draft',
    APPROVED = 'approved',
    COMPLETED = 'completed',
  }
  
  @Entity('trips')
  export class Trip {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Vehicle)
    vehicle: Vehicle;
  
    @ManyToOne(() => User)
    driver: User;
  
    @ManyToMany(() => ShipmentItem)
    @JoinTable()
    shipmentItems: ShipmentItem[];
  
    @Column({ type: 'enum', enum: TripStatus, default: TripStatus.DRAFT })
    status: TripStatus;
  
    @Column({ nullable: true })
    pickupSummary?: string;
  
    @Column({ nullable: true })
    deliverySummary?: string;
  
    @Column({ default: true })
    isActive: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }