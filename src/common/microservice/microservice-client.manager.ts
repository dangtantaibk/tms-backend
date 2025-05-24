import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientTCP } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MicroserviceClientManager implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MicroserviceClientManager.name);
  private userClient: ClientTCP;

  constructor(private configService: ConfigService) {
    this.userClient = new ClientTCP({
      host: this.configService.get<string>('USER_MICROSERVICE_HOST', 'localhost'),
      port: this.configService.get<number>('USER_MICROSERVICE_PORT', 3003),
    });
  }

  async onModuleInit() {
    try {
      await this.userClient.connect();
      this.logger.log('✅ Connected to User Microservice successfully');
    } catch (error) {
      this.logger.error('❌ Failed to connect to User Microservice:', error.message);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.userClient.close();
      this.logger.log('🔌 Disconnected from User Microservice');
    } catch (error) {
      this.logger.error('❌ Error disconnecting from User Microservice:', error.message);
    }
  }

  // User operations
  async sendUserCommand<T>(pattern: string, data: any): Promise<T> {
    try {
      return await firstValueFrom(this.userClient.send<T>(pattern, data));
    } catch (error) {
      this.logger.error(`❌ Microservice call failed for pattern: ${pattern}`, error);
      throw error;
    }
  }
}