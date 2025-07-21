import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { LoggingModule } from './common/logging/logging.module';
import { MicroserviceModule } from './common/microservice/microservice.module';
import { HealthController } from './common/microservice/health.controller';

// Ensure environment variables are loaded
dotenv.config();

const logger = new Logger('Database');
logger.log(`USER_MICROSERVICE_HOST: ${process.env.USER_MICROSERVICE_HOST}`);
logger.log(`USER_MICROSERVICE_PORT: ${process.env.USER_MICROSERVICE_PORT}`);
logger.log(`NODE_ENV: ${process.env.NODE_ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000, // time to live - 1 minute
      limit: 10,  // 10 requests per ttl globally
    }]),
    MicroserviceModule,
    AuthModule,
    UsersModule,
    RolesModule,
    OrdersModule,
    LoggingModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}