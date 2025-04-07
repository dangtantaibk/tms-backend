import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { CustomersModule } from './customers/customers.module';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Customer } from './customers/entities/customer.entity';
import { Project } from './projects/entities/project.entity';
import { Hub } from './hubs/entities/hub.entity';
import { ShipmentItem } from './shipment-items/entities/shipment-item.entity';
import { ShippingOrder } from './shipping-orders/entities/shipping-order.entity';
import { Trip } from './trips/entities/trip.entity';
import { Dispatch } from './dispatch/entities/dispatch.entity';
import { ImportHistory } from './import/entities/import-history.entity';
import { ExportHistory } from './export/entities/export-history.entity';
import { ExportModule } from './export/export.module';
import { ImportModule } from './import/import.module';
import { DispatchModule } from './dispatch/dispatch.module';
import { HubsModule } from './hubs/hubs.module';
import { ProjectsModule } from './projects/projects.module';
import { ShipTo } from './ship-to/entities/shipto.entity';
import { ShipToModule } from './ship-to/shipto.module';
import { ShipmentItemsModule } from './shipment-items/shipment-items.module';
import { ShippingOrdersModule } from './shipping-orders/shipping-orders.module';
import { TripsModule } from './trips/trips.module';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { VehiclesModule } from './vehicles/vehicles.module';
// ... import các module khác
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

// Ensure environment variables are loaded
dotenv.config();

const logger = new Logger('Database');
logger.log(`DATABASE_PASSWORD value: ${process.env.DATABASE_PASSWORD}`);
logger.log(`DATABASE_PASSWORD value: ${process.env.DATABASE_PASSWORD}`);
logger.log(`DATABASE_USER value: ${process.env.DATABASE_USER}`);
logger.log(`NODE_ENV value: ${process.env.NODE_ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port:  parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [User, Role, Customer, Project, Hub, ShipTo,
        Vehicle, ShipmentItem, ShippingOrder, Trip,
        Dispatch, ImportHistory, ExportHistory],
      migrations: ['src/database/migrations/*.ts'],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    CustomersModule,
    ExportModule,
    ImportModule,
    DispatchModule,
    HubsModule,
    ProjectsModule,
    ShipToModule,
    ShipmentItemsModule,
    ShippingOrdersModule,
    TripsModule,
    VehiclesModule,
    // ... các module khác
  ],
})
export class AppModule {}