import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingOrdersController } from './shipping-orders.controller';
import { ShippingOrdersService } from './shipping-orders.service';
import { ShippingOrder } from './entities/shipping-order.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Project } from '../projects/entities/project.entity';
import { ShipmentItem } from '../shipment-items/entities/shipment-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShippingOrder, Customer, Project, ShipmentItem]),
  ],
  controllers: [ShippingOrdersController],
  providers: [ShippingOrdersService],
})
export class ShippingOrdersModule {}