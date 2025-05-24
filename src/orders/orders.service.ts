import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_SERVICE')
    private readonly orderClient: ClientProxy,
  ) {}

  async create(createOrderDto: CreateOrderDto, userRole: string): Promise<Order> {
    return firstValueFrom(
      this.orderClient.send('order.create', { createOrderDto, userRole })
    );
  }

  async findAll(userRole: string): Promise<Order[]> {
    return firstValueFrom(
      this.orderClient.send('order.findAll', { userRole })
    );
  }

  async findOne(id: string, userRole: string): Promise<Order> {
    return firstValueFrom(
      this.orderClient.send('order.findOne', { id, userRole })
    );
  }

  async updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto, userRole: string): Promise<Order> {
    return firstValueFrom(
      this.orderClient.send('order.updateStatus', { id, updateOrderStatusDto, userRole })
    );
  }

  async updatePaymentStatus(id: string, updatePaymentStatusDto: UpdatePaymentStatusDto, userRole: string): Promise<Order> {
    return firstValueFrom(
      this.orderClient.send('order.updatePaymentStatus', { id, updatePaymentStatusDto, userRole })
    );
  }

  async remove(id: string, userRole: string): Promise<void> {
    return firstValueFrom(
      this.orderClient.send('order.remove', { id, userRole })
    );
  }
}