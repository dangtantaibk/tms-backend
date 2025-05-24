import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MicroserviceModule } from '../common/microservice/microservice.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [MicroserviceModule, RolesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}