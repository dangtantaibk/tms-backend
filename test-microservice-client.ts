import { ClientTCP } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateRoleDto } from './src/roles/dto/create-role.dto';
import { UpdateRoleDto } from './src/roles/dto/update-role.dto';
import { Role } from './src/roles/entities/role.entity';
import { config } from 'dotenv';
import { BaseResponse } from './src/common/interfaces/response.interface';
config();

class RoleMicroserviceTestClient {
  private client: ClientTCP;

  constructor() {
    console.log('Initializing RoleMicroserviceTestClient...', process.env.USER_MICROSERVICE_HOST, process.env.USER_MICROSERVICE_PORT);
    this.client = new ClientTCP({
      host: process.env.USER_MICROSERVICE_HOST || 'localhost',
      port: Number(process.env.USER_MICROSERVICE_PORT) || 3003,
    });
  }

  async connect(): Promise<boolean> {
    try {
      await this.client.connect();
      console.log('✅ Connected to role microservice successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to connect to role microservice:', error.message);
      return false;
    }
  }

  async disconnect(): Promise<void> {
    await this.client.close();
    console.log('🔌 Disconnected from role microservice');
  }

  // Core role methods
  async createRole(createRoleDto: CreateRoleDto): Promise<BaseResponse<Role>> {
    return firstValueFrom(this.client.send<BaseResponse<Role>>('role.create', createRoleDto));
  }

  async findAllRoles(): Promise<BaseResponse<Role[]>> {
    return firstValueFrom(this.client.send<BaseResponse<Role[]>>('role.findAll', {}));
  }

  async findRoleById(id: string): Promise<BaseResponse<Role>> {
    return firstValueFrom(this.client.send<BaseResponse<Role>>('role.findById', id));
  }

  async findRoleByName(name: string): Promise<BaseResponse<Role>> {
    return firstValueFrom(this.client.send<BaseResponse<Role>>('role.findByName', name));
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<BaseResponse<Role>> {
    const payload = { id, updateRoleDto };
    return firstValueFrom(this.client.send<BaseResponse<Role>>('role.update', payload));
  }

  async deleteRole(id: string): Promise<{ message: string }> {
    return firstValueFrom(this.client.send<{ message: string }>('role.delete', id));
  }

  async addPermissions(id: string, permissions: string[]): Promise<BaseResponse<Role>> {
    const payload = { id, permissions };
    return firstValueFrom(this.client.send<BaseResponse<Role>>('role.addPermissions', payload));
  }

  async removePermissions(id: string, permissions: string[]): Promise<BaseResponse<Role>> {
    const payload = { id, permissions };
    return firstValueFrom(this.client.send<BaseResponse<Role>>('role.removePermissions', payload));
  }

  async getUsersWithRole(roleId: string): Promise<any> {
    return firstValueFrom(this.client.send<any>('role.getUsersWithRole', roleId));
  }

  // Test wrapper methods with error handling
  async testFindAllRoles(): Promise<BaseResponse<Role[]>> {
    try {
      const result = await this.findAllRoles();
      console.log('✅ Find All Roles Result:', result);
      return result;
    } catch (error) {
      console.error('❌ Find All Roles Error:', error.message);
      throw error;
    }
  }

  async testCreateRole(): Promise<BaseResponse<Role>> {
    try {
      const createRoleDto: CreateRoleDto = {
        name: 'Test Role',
        description: 'This is a test role for microservice testing',
        permissions: ['read', 'write']
      };

      const result = await this.createRole(createRoleDto);
      console.log('✅ Create Role Result:', result);
      return result;
    } catch (error) {
      console.error('❌ Create Role Error:', error.error.message);
      throw error;
    }
  }

  async testFindRoleById(id: string): Promise<BaseResponse<Role>> {
    try {
      const result = await this.findRoleById(id);
      console.log('✅ Find Role By ID Result:', result);
      return result;
    } catch (error) {
      console.error('❌ Find Role By ID Error:', error.message);
      throw error;
    }
  }

  async testFindRoleByName(name: string): Promise<BaseResponse<Role>> {
    try {
      const result = await this.findRoleByName(name);
      console.log('✅ Find Role By Name Result:', result);
      return result;
    } catch (error) {
      console.error('❌ Find Role By Name Error:', error.message);
      throw error;
    }
  }

  async testUpdateRole(id: string, updateData: UpdateRoleDto): Promise<BaseResponse<Role>> {
    try {
      const result = await this.updateRole(id, updateData);
      console.log('✅ Update Role Result:', result);
      return result;
    } catch (error) {
      console.error('❌ Update Role Error:', error.message);
      throw error;
    }
  }

  async testDeleteRole(id: string): Promise<{ message: string }> {
    try {
      const result = await this.deleteRole(id);
      console.log('✅ Delete Role Result:', result);
      return result;
    } catch (error) {
      console.error('❌ Delete Role Error:', error.message);
      throw error;
    }
  }

  async testAddPermissions(id: string, permissions: string[]): Promise<BaseResponse<Role>> {
    try {
      const result = await this.addPermissions(id, permissions);
      console.log('✅ Add Permissions Result:', result);
      return result;
    } catch (error) {
      console.error('❌ Add Permissions Error:', error.message);
      throw error;
    }
  }

  async testRemovePermissions(id: string, permissions: string[]): Promise<BaseResponse<Role>> {
    try {
      const result = await this.removePermissions(id, permissions);
      console.log('✅ Remove Permissions Result:', result);
      return result;
    } catch (error) {
      console.error('❌ Remove Permissions Error:', error.message);
      throw error;
    }
  }

  async testGetUsersWithRole(roleId: string): Promise<any> {
    try {
      const result = await this.getUsersWithRole(roleId);
      console.log('✅ Get Users With Role Result:', result);
      return result;
    } catch (error) {
      console.error('❌ Get Users With Role Error:', error.message);
      throw error;
    }
  }
}

// Test function
async function runRoleTests() {
  const client = new RoleMicroserviceTestClient();

  const connected = await client.connect();
  if (!connected) {
    return;
  }

  try {
    console.log('\n🧪 Starting role microservice tests...\n');

    // Test 1: Find all roles
    console.log('📋 Test 1: Find All Roles');
    const roles = await client.testFindAllRoles();
    console.log('Roles:', roles);
    if (roles && roles.data && roles.data.length !== 0) {
      await client.testDeleteRole(roles.data[0].id);
      console.log('No roles found, skipping further tests.');
    }

    // Test 2: Create role
    console.log('\n🎭 Test 2: Create Role');
    const newRole = await client.testCreateRole();

    if (newRole && newRole.data && newRole.data.id) {
      // Test 3: Find role by ID
      console.log('\n🔍 Test 3: Find Role By ID');
      await client.testFindRoleById(newRole.data.id);

      // Test 4: Find role by name
      console.log('\n📛 Test 4: Find Role By Name');
      await client.testFindRoleByName(newRole.data.name);

      // Test 5: Update role
      console.log('\n✏️ Test 5: Update Role');
      await client.testUpdateRole(newRole.data.id, {
        description: 'Updated test role description'
      });

      // Test 6: Add permissions
      console.log('\n➕ Test 6: Add Permissions');
      await client.testAddPermissions(newRole.data.id, ['delete', 'admin']);

      // Test 7: Remove permissions
      console.log('\n➖ Test 7: Remove Permissions');
      await client.testRemovePermissions(newRole.data.id, ['delete']);

      // Test 8: Get users with role
      console.log('\n👥 Test 8: Get Users With Role');
      await client.testGetUsersWithRole(newRole.data.id);

      // Test 9: Delete role (commented out to preserve test data)
      console.log('\n🗑️ Test 9: Delete Role');
      await client.testDeleteRole(newRole.data.id);
    }

  } catch (error) {
    console.error('❌ Role test execution error:', error);
  } finally {
    await client.disconnect();
  }
}

// Run tests
runRoleTests().catch(console.error);

export { RoleMicroserviceTestClient };