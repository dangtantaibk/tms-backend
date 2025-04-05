import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShippingOrder } from './entities/shipping-order.entity';
import { CreateShippingOrderDto } from './dto/create-shipping-order.dto';
import { UpdateShippingOrderDto } from './dto/update-shipping-order.dto';
import { Customer } from '../customers/entities/customer.entity';
import { Project } from '../projects/entities/project.entity';
import { ShipmentItem } from '../shipment-items/entities/shipment-item.entity';

@Injectable()
export class ShippingOrdersService {
  constructor(
    @InjectRepository(ShippingOrder)
    private readonly repo: Repository<ShippingOrder>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(ShipmentItem)
    private readonly itemRepo: Repository<ShipmentItem>,
  ) {}

  async create(dto: CreateShippingOrderDto) {
    const order = this.repo.create({
      ...dto,
    });

    if (dto.customerId) {
      order.customer = await this.customerRepo.findOneBy({ id: dto.customerId });
    }
    if (dto.projectId) {
      order.project = await this.projectRepo.findOneBy({ id: dto.projectId });
    }

    if (dto.shipmentItemIds && dto.shipmentItemIds.length > 0) {
      order.shipmentItems = await this.itemRepo.findByIds(dto.shipmentItemIds);
    }

    return this.repo.save(order);
  }

  findAll() {
    return this.repo.find({ relations: ['customer', 'project', 'shipmentItems'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['customer', 'project', 'shipmentItems'] });
  }

  async update(id: string, dto: UpdateShippingOrderDto) {
    const order = await this.repo.findOneBy({ id });
    if (!order) throw new NotFoundException('Shipping Order not found');

    Object.assign(order, dto);
    return this.repo.save(order);
  }

  async remove(id: string) {
    const order = await this.repo.findOneBy({ id });
    if (!order) throw new NotFoundException('Shipping Order not found');

    order.isActive = false;
    return this.repo.save(order);
  }
}