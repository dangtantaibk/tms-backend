import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { MicroserviceClientManager } from '../common/microservice/microservice-client.manager';

@Injectable()
export class RolesService {
  constructor(
    private readonly microserviceClient: MicroserviceClientManager,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.microserviceClient.sendUserCommand<Role>('role.create', createRoleDto);
  }

  async findAll(): Promise<Role[]> {
    return this.microserviceClient.sendUserCommand<Role[]>('role.findAll', {});
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.microserviceClient.sendUserCommand<Role>('role.findById', id);
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const payload = { id, updateRoleDto };
    return this.microserviceClient.sendUserCommand<Role>('role.update', payload);
  }

  async remove(id: string): Promise<void> {
    await this.microserviceClient.sendUserCommand<{ message: string }>('role.delete', id);
  }

  async addPermissions(id: string, permissions: string[]): Promise<Role> {
    const payload = { id, permissions };
    return this.microserviceClient.sendUserCommand<Role>('role.addPermissions', payload);
  }

  async removePermissions(id: string, permissions: string[]): Promise<Role> {
    const payload = { id, permissions };
    return this.microserviceClient.sendUserCommand<Role>('role.removePermissions', payload);
  }
}