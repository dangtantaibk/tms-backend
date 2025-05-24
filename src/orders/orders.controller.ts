import { Body, Controller, Delete, Get, HttpCode, Logger, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { LoggerUtil } from '../common/utils/logger.util';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

interface AuthenticatedRequest extends Request {
  user: {
    role: string;
    userId: string;
  };
}

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  private readonly logger = new Logger(OrdersController.name);
  private readonly startTime = Date.now();

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order successfully created', type: Order })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: AuthenticatedRequest
  ): Promise<Order> {
    LoggerUtil.log(this.logger, 'Create order', { createOrderDto, userRole: req.user.role }, this.startTime);
    return this.ordersService.create(createOrderDto, req.user.role);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of all orders', type: [Order] })
  async findAll(@Req() req: AuthenticatedRequest): Promise<Order[]> {
    LoggerUtil.log(this.logger, 'Get all orders', { userRole: req.user.role }, this.startTime);
    return this.ordersService.findAll(req.user.role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order found', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async findOne(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest
  ): Promise<Order> {
    LoggerUtil.log(this.logger, 'Get order by ID', { id, userRole: req.user.role }, this.startTime);
    return this.ordersService.findOne(id, req.user.role);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update order status' })
  @ApiResponse({ status: 200, description: 'Order status successfully updated', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 403, description: 'Unauthorized access' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @Req() req: AuthenticatedRequest
  ): Promise<Order> {
    LoggerUtil.log(this.logger, 'Update order status', { 
      id, 
      updateOrderStatusDto, 
      userRole: req.user.role 
    }, this.startTime);
    return this.ordersService.updateStatus(id, updateOrderStatusDto, req.user.role);
  }

  @Put(':id/payment-status')
  @ApiOperation({ summary: 'Update order payment status' })
  @ApiResponse({ status: 200, description: 'Order payment status successfully updated', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 403, description: 'Unauthorized access' })
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body() updatePaymentStatusDto: UpdatePaymentStatusDto,
    @Req() req: AuthenticatedRequest
  ): Promise<Order> {
    LoggerUtil.log(this.logger, 'Update order payment status', { 
      id, 
      updatePaymentStatusDto, 
      userRole: req.user.role 
    }, this.startTime);
    return this.ordersService.updatePaymentStatus(id, updatePaymentStatusDto, req.user.role);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 204, description: 'Order successfully deleted' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 403, description: 'Unauthorized access' })
  async remove(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest
  ): Promise<void> {
    LoggerUtil.log(this.logger, 'Delete order', { id, userRole: req.user.role }, this.startTime);
    return this.ordersService.remove(id, req.user.role);
  }
}