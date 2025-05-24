import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { MicroserviceClientManager } from '../common/microservice/microservice-client.manager';

@Injectable()
export class UsersService {
  constructor(
    private readonly microserviceClient: MicroserviceClientManager,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.microserviceClient.sendUserCommand<User>('user.create', createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.microserviceClient.sendUserCommand<User[]>('user.findAll', {});
  }

  async findOne(id: string): Promise<User> {
    const user = await this.microserviceClient.sendUserCommand<User>('user.findById', id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.microserviceClient.sendUserCommand<User>('user.findByEmail', email);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const payload = { id, updateUserDto };
    return this.microserviceClient.sendUserCommand<User>('user.update', payload);
  }

  async remove(id: string): Promise<void> {
    await this.microserviceClient.sendUserCommand<{ message: string }>('user.delete', id);
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    return this.microserviceClient.sendUserCommand<string[]>('user.getUserPermissions', userId);
  }
}