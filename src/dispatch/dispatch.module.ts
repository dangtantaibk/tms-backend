import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchController } from './dispatch.controller';
import { DispatchService } from './dispatch.service';
import { ShipmentItem } from '../shipment-items/entities/shipment-item.entity';
import { Trip } from '../trips/entities/trip.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShipmentItem, Trip, Vehicle, User])],
  controllers: [DispatchController],
  providers: [DispatchService],
})
export class DispatchModule {}