import { Module } from '@nestjs/common';
import { MicroserviceModule } from 'src/common/microservice/microservice.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MicroserviceModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {} 

// @Module({
//   imports: [MicroserviceModule],
//   controllers: [RolesController],
//   providers: [RolesService],
//   exports: [RolesService],
// })
// export class RolesModule {}