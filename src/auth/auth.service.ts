import { Injectable, Logger, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { MicroserviceClientManager } from '../common/microservice/microservice-client.manager';
import { BaseResponse } from '../common/interfaces/response.interface';

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
  };
}

export interface LogoutResponse {
  message: string;
}

export interface UserProfileResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles: {
    id: string;
    name: string;
    description: string;
  }[];
  permissions: string[];
}

export class LoginDto {
  email: string;
  password: string;
}


@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly microserviceClient: MicroserviceClientManager,
  ) {}

  /**
   * Validate user credentials
   * @param email User email
   * @param password User password
   * @returns User object without password if valid, null otherwise
   */
  async validateUser(email: string, password: string): Promise<BaseResponse<any>> {
    try {
      this.logger.debug(`Validating user credentials for email: ${email}`);
      return this.microserviceClient.sendUserCommand('auth.validateUser', { email, password });
    } catch (error) {
      // Check if this is a connection error
      if (error instanceof ServiceUnavailableException) {
        this.logger.error(`Microservice connection error: ${error.message}`);
        throw error; // Rethrow connection errors to be handled by controller
      }

      // For credential validation errors, log and return null
      this.logger.error(`Failed to validate user: ${error.message}`);
      return null;
    }
  }

  /**
   * Login user and generate access and refresh tokens
   * @param user User object
   * @returns Auth response with tokens and user info
   */
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    this.logger.debug(`Logging in user: ${loginDto.email} ${loginDto.password}`);
    const rs = await this.microserviceClient.sendUserCommand<AuthResponse>('auth.login', loginDto);
    return rs;
  }

  /**
   * Direct login with email and password
   * @param email User email
   * @param password User password
   * @returns Auth response with tokens and user info
   */
  async loginWithCredentials(email: string, password: string): Promise<BaseResponse<AuthResponse>> {
    this.logger.debug(`Logging in with credentials for: ${email}`);
    return this.microserviceClient.sendUserCommand<BaseResponse<AuthResponse>>('auth.login', { email, password });
  }

  /**
   * Refresh tokens using a valid refresh token
   * @param refreshToken Refresh token string
   * @returns Auth response with new tokens
   */
  async refreshToken(refreshToken: string): Promise<BaseResponse<AuthResponse>> {
    this.logger.debug('Refreshing token');
    return this.microserviceClient.sendUserCommand<BaseResponse<AuthResponse>>('auth.refresh', { refresh_token: refreshToken });
  }

  /**
   * Get detailed user profile including roles and permissions
   * @param userId User ID
   * @returns User profile response with permissions
   */
  async getProfile(userId: string): Promise<BaseResponse<UserProfileResponse>> {
    this.logger.debug(`Getting profile for user: ${userId}`);
    return this.microserviceClient.sendUserCommand<BaseResponse<UserProfileResponse>>('auth.getProfile', userId);
  }

  /**
   * Logout user by invalidating their token
   * @param token JWT token to invalidate
   */
  async logout(token: string): Promise<BaseResponse<LogoutResponse>> {
    this.logger.debug('Logging out user');
    return this.microserviceClient.sendUserCommand<BaseResponse<LogoutResponse>>('auth.logout', token);
  }
}