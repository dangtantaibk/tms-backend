import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentItemsController } from './shipment-items.controller';
import { ShipmentItemsService } from './shipment-items.service';
import { ShipmentItem } from './entities/shipment-item.entity';
import { Customer } from '../customers/entities/customer.entity';
import { ShipTo } from '../ship-to/entities/shipto.entity';
import { Project } from '../projects/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShipmentItem, Customer, ShipTo, Project]),
  ],
  controllers: [ShipmentItemsController],
  providers: [ShipmentItemsService],
})
export class ShipmentItemsModule {}