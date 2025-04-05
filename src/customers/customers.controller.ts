import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Customer } from './entities/customer.entity';

@ApiTags('Customers')
@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @Roles('admin', 'staff')
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({
    status: 201,
    description: 'Customer successfully created',
    type: Customer,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @Roles('admin', 'staff')
  @ApiOperation({ summary: 'Get all customers' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false, enum: ['individual', 'organization'] })
  @ApiQuery({ name: 'status', required: false, enum: ['active', 'closed'] })
  @ApiResponse({
    status: 200,
    description: 'List of all customers',
    type: Customer,
    isArray: true,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findAll(@Query() query: any) {
    return this.customersService.findAll(query);
  }

  @Get(':id')
  @Roles('admin', 'staff')
  @ApiOperation({ summary: 'Get a customer by id' })
  @ApiResponse({
    status: 200,
    description: 'Customer found',
    type: Customer,
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'staff')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiResponse({
    status: 200,
    description: 'Customer successfully updated',
    type: Customer,
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiResponse({
    status: 200,
    description: 'Customer successfully deleted',
    type: Customer,
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async remove(@Param('id') id: string): Promise<Customer> {
    // Kiểm tra các ràng buộc trước khi xóa
    const hasRelations = await this.customersService.checkRelations(id);
    if (hasRelations) {
      throw new Error('Cannot delete customer. Customer has related objects.');
    }
    return this.customersService.softDelete(id);
  }
} 