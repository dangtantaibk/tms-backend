import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { MicroserviceClientManager } from '../common/microservice/microservice-client.manager';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly microserviceClient: MicroserviceClientManager,
  ) {}

  /**
   * Create a new user
   * @param createUserDto User creation data
   * @returns Created user with password omitted
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.debug('Creating user');
    return this.microserviceClient.sendUserCommand<User>('user.create', createUserDto);
  }

  /**
   * Get all users
   * @returns Array of users with passwords omitted
   */
  async findAll(): Promise<User[]> {
    this.logger.debug('Finding all users');
    return this.microserviceClient.sendUserCommand<User[]>('user.findAll', {});
  }

  /**
   * Find user by ID
   * @param id User ID
   * @returns User with password omitted
   */
  async findOne(id: string): Promise<User> {
    this.logger.debug(`Finding user by ID: ${id}`);
    // Note: MicroserviceClientManager handles NOT_FOUND errors from the microservice
    return this.microserviceClient.sendUserCommand<User>('user.findById', id);
  }

  /**
   * Find user by email
   * @param email User email
   * @returns User with password omitted
   */
  async findByEmail(email: string): Promise<User> {
    this.logger.debug(`Finding user by email: ${email}`);
    return this.microserviceClient.sendUserCommand<User>('user.findByEmail', email);
  }

  /**
   * Update user
   * @param id User ID
   * @param updateUserDto Update data
   * @returns Updated user with password omitted
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.debug(`Updating user ${id}`);
    const payload = { id, updateUserDto };
    return this.microserviceClient.sendUserCommand<User>('user.update', payload);
  }

  /**
   * Delete user
   * @param id User ID
   * @returns Success message
   */
  async remove(id: string): Promise<{ message: string }> {
    this.logger.debug(`Removing user ${id}`);
    return this.microserviceClient.sendUserCommand<{ message: string }>('user.delete', id);
  }

  /**
   * Get user permissions
   * @param userId User ID
   * @returns Array of permission strings
   */
  async getUserPermissions(userId: string): Promise<string[]> {
    this.logger.debug(`Getting permissions for user ${userId}`);
    return this.microserviceClient.sendUserCommand<string[]>('user.getUserPermissions', userId);
  }
}