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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Role, Customer],
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