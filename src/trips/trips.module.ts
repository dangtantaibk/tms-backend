import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { Trip } from './entities/trip.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { User } from '../users/entities/user.entity';
import { ShipmentItem } from '../shipment-items/entities/shipment-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip, Vehicle, User, ShipmentItem]),
  ],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}