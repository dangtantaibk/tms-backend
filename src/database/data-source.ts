import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Project } from '../projects/entities/project.entity';
import { Hub } from '../hubs/entities/hub.entity';
import { ShipTo } from '../ship-to/entities/shipto.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { ShipmentItem } from '../shipment-items/entities/shipment-item.entity';
import { ShippingOrder } from '../shipping-orders/entities/shipping-order.entity';
import { Trip } from '../trips/entities/trip.entity';
import { Dispatch } from '../dispatch/entities/dispatch.entity';
import { ImportHistory } from '../import/entities/import-history.entity';
import { ExportHistory } from '../export/entities/export-history.entity';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false, // Keep this false in production
  logging: process.env.NODE_ENV === 'development',
  entities: [
    User, Role, Customer, Project, Hub, ShipTo,
    Vehicle, ShipmentItem, ShippingOrder, Trip,
    Dispatch, ImportHistory, ExportHistory
  ],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

export default AppDataSource;
