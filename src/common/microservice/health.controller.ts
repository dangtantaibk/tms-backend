import { Controller, Get } from '@nestjs/common';
import { MicroserviceClientManager } from './microservice-client.manager';
import { Public } from '../decorators/public.decorator';

@Controller('health')
export class HealthController {
  constructor(
    private readonly microserviceClient: MicroserviceClientManager,
  ) {}

  @Get()
  @Public()
  async checkHealth() {
    const microserviceStatus = this.microserviceClient.isConnectionActive();
    
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      microservices: {
        userService: microserviceStatus ? 'connected' : 'disconnected'
      },
      application: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.env.npm_package_version || '1.0.0'
      }
    };
  }

  @Get('microservice')
  @Public()
  async checkMicroservice() {
    try {
      await this.microserviceClient.sendUserCommand('health.check', {});
      return { status: 'connected', timestamp: new Date().toISOString() };
    } catch (error) {
      return { 
        status: 'disconnected', 
        error: error.message,
        timestamp: new Date().toISOString() 
      };
    }
  }
}