import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { BaseResponse } from 'src/common/interfaces/response.interface';
import { MicroserviceClientManager } from 'src/common/microservice/microservice-client.manager';

@Injectable()
export class OrdersService {
  constructor(
    private readonly microserviceClient: MicroserviceClientManager,
  ) {}

  async create(createOrderDto: CreateOrderDto, userRole: string): Promise<Order> {
    return this.microserviceClient.sendUserCommand('order.create', { createOrderDto, userRole });
  }

  async findAll(userRole: string): Promise<Order[]> {
    return this.microserviceClient.sendUserCommand('order.findAll', { userRole });
  }

  async findOne(id: string, userRole: string): Promise<Order> {
    return this.microserviceClient.sendUserCommand('order.findOne', { id, userRole });
    
  }

  async updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto, userRole: string): Promise<Order> {
    return this.microserviceClient.sendUserCommand('order.updateStatus', { id, updateOrderStatusDto, userRole });
  }

  async updatePaymentStatus(id: string, updatePaymentStatusDto: UpdatePaymentStatusDto, userRole: string): Promise<Order> {
    return this.microserviceClient.sendUserCommand('order.updatePaymentStatus', { id, updatePaymentStatusDto, userRole });
  }

  async remove(id: string, userRole: string): Promise<void> {
    return this.microserviceClient.sendUserCommand('order.remove', { id, userRole });
  }
}