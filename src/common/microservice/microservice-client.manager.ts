import { Injectable, OnModuleInit, OnModuleDestroy, Logger, NotFoundException, BadRequestException, ForbiddenException, UnauthorizedException, HttpException, ConflictException, InternalServerErrorException, NotImplementedException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientTCP } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { BaseResponse } from '../interfaces/response.interface';

// Error codes enum
export const ERROR_CODES = {
  // User related errors
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  NOT_FOUND: 'NOT_FOUND',
  CANNOT_DELETE_LAST_ADMIN: 'CANNOT_DELETE_LAST_ADMIN',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  CONFLICT: 'CONFLICT',
  
  // Role related errors
  ROLES_NOT_FOUND: 'ROLES_NOT_FOUND',
  
  // Authentication errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  
  // General errors
  BAD_REQUEST: 'BAD_REQUEST',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NOT_IMPLEMENTED: 'NOT_IMPLEMENTED',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE'
};

// Mapping error codes to HTTP status codes
export const ERROR_CODE_TO_HTTP = {
  [ERROR_CODES.ALREADY_EXISTS]: 409, // Conflict
  [ERROR_CODES.CONFLICT]: 409, // Conflict
  [ERROR_CODES.NOT_FOUND]: 404, // Not Found
  [ERROR_CODES.CANNOT_DELETE_LAST_ADMIN]: 400, // Bad Request
  [ERROR_CODES.INVALID_CREDENTIALS]: 401, // Unauthorized
  [ERROR_CODES.ROLES_NOT_FOUND]: 404, // Not Found
  [ERROR_CODES.UNAUTHORIZED]: 401, // Unauthorized
  [ERROR_CODES.FORBIDDEN]: 403, // Forbidden
  [ERROR_CODES.VALIDATION_ERROR]: 400, // Bad Request
  [ERROR_CODES.BAD_REQUEST]: 400, // Bad Request
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: 500, // Internal Server Error
  [ERROR_CODES.NOT_IMPLEMENTED]: 501, // Not Implemented
  [ERROR_CODES.SERVICE_UNAVAILABLE]: 503, // Service Unavailable
};

@Injectable()
export class MicroserviceClientManager implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MicroserviceClientManager.name);
  private userClient: ClientTCP;
  private isConnected = false;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    try {
      const host = this.configService.get<string>('USER_MICROSERVICE_HOST', 'localhost');
      const port = this.configService.get<number>('USER_MICROSERVICE_PORT', 3003);
      
      this.logger.log(`🔗 Initializing connection to microservice at ${host}:${port}`);
      
      this.userClient = new ClientTCP({
        host,
        port
      });

      await this.userClient.connect();
      this.isConnected = true;
      this.logger.log('✅ Connected to User Microservice successfully');
    } catch (error) {
      this.logger.error('❌ Failed to connect to User Microservice:', error.message);
      this.isConnected = false;
      // Don't throw error so the app can still start
      this.logger.warn('🔄 Application will continue without microservice connection');
    }
  }

  async onModuleDestroy() {
    if (this.userClient && this.isConnected) {
      try {
        await this.userClient.close();
        this.isConnected = false;
        this.logger.log('🔌 Disconnected from User Microservice');
      } catch (error) {
        this.logger.error('❌ Error disconnecting from User Microservice:', error.message);
      }
    }
  }

  // User operations with connection check and improved error handling
  async sendUserCommand<T>(pattern: string, data: any): Promise<T> {
    if (!this.isConnected || !this.userClient) {
      this.logger.error('❌ Microservice connection not available');
      throw new ServiceUnavailableException('Microservice is not connected. Please try again later.');
    }

    try {
      this.logger.debug(`📤 Sending command: ${pattern}`, { data });
      
      // Get the raw response from microservice
      const response = await firstValueFrom(this.userClient.send<BaseResponse<T>>(pattern, data));
      
      // Check if response is in the expected BaseResponse format
      if (response && typeof response === 'object' && 'success' in response) {
        // If success is false, handle the error
        if (!response.success && response.error) {
          this.logger.error(`❌ Microservice error for pattern: ${pattern}`, {
            code: response.error.code,
            message: response.error.message,
            details: response.error.details,
            data
          });
          
          // Throw appropriate exception based on error code
          this.throwAppropriateException(response.error);
        }
        
        // Return the data field on success
        this.logger.debug(`📥 Received successful response for: ${pattern}`);
        return response.data as T;
      } else {
        // If response is not in BaseResponse format, return it directly
        // This handles backward compatibility with services that don't use BaseResponse
        this.logger.debug(`📥 Received direct response for: ${pattern}`);
        return response as unknown as T;
      }
    } catch (error) {
      // If error is already a NestJS HttpException (thrown by throwAppropriateException),
      // rethrow it directly
      if (error instanceof HttpException) {
        throw error;
      }
      
      // For other errors (like connection errors), log and rethrow appropriately
      this.logger.error(`❌ Microservice call failed for pattern: ${pattern}`, {
        error: error.message,
        stack: error.stack,
        data
      });
      
      // Handle RPC exceptions or other errors
      if (error.response) {
        const message = error.response.message || error.message;
        const status = error.response.statusCode || error.status || 500;
        
        throw new HttpException(message, status);
      }
      
      // For unhandled errors, throw a generic error
      throw new InternalServerErrorException('An error occurred while communicating with the microservice');
    }
  }

  // Helper method to throw the appropriate exception based on error code
  private throwAppropriateException(error: { code: string, message: string, details?: any }): never {
    const message = error.message || 'An error occurred';
    const code = error.code || ERROR_CODES.INTERNAL_SERVER_ERROR;
    const details = error.details;
    
    // Map error code to appropriate HTTP exception
    switch (code) {
      case ERROR_CODES.NOT_FOUND:
      case ERROR_CODES.ROLES_NOT_FOUND:
        throw new NotFoundException(message);
        
      case ERROR_CODES.ALREADY_EXISTS:
      case ERROR_CODES.CONFLICT:
        throw new ConflictException(message);
        
      case ERROR_CODES.UNAUTHORIZED:
      case ERROR_CODES.INVALID_CREDENTIALS:
        throw new UnauthorizedException(message);
        
      case ERROR_CODES.FORBIDDEN:
        throw new ForbiddenException(message);
        
      case ERROR_CODES.BAD_REQUEST:
      case ERROR_CODES.VALIDATION_ERROR:
      case ERROR_CODES.CANNOT_DELETE_LAST_ADMIN:
        throw new BadRequestException(message);
        
      case ERROR_CODES.NOT_IMPLEMENTED:
        throw new NotImplementedException(message);
        
      case ERROR_CODES.SERVICE_UNAVAILABLE:
        throw new ServiceUnavailableException(message);
        
      case ERROR_CODES.INTERNAL_SERVER_ERROR:
      default:
        throw new InternalServerErrorException(message);
    }
  }

  // Check connection status
  isConnectionActive(): boolean {
    return this.isConnected;
  }

  // Method to attempt reconnection
  async reconnect(): Promise<boolean> {
    if (this.isConnected) {
      return true;
    }

    try {
      await this.onModuleInit();
      return this.isConnected;
    } catch (error) {
      this.logger.error('❌ Reconnection failed:', error.message);
      return false;
    }
  }
}