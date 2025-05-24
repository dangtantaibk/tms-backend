import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MicroserviceClientManager } from './microservice-client.manager';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [MicroserviceClientManager],
  exports: [MicroserviceClientManager],
})
export class MicroserviceModule {}