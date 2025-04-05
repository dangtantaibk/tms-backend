import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { Trip } from '../../trips/entities/trip.entity';
  import { ShipmentItem } from '../../shipment-items/entities/shipment-item.entity';
  import { User } from '../../users/entities/user.entity';
  
  @Entity('dispatches')
  export class Dispatch {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Trip, { nullable: false })
    trip: Trip;
  
    @ManyToOne(() => ShipmentItem, { nullable: false })
    shipmentItem: ShipmentItem;
  
    @ManyToOne(() => User, { nullable: true })
    createdBy?: User;
  
    @CreateDateColumn()
    createdAt: Date;
  }
  