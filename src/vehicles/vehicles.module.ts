import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './entities/vehicle.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, User])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}