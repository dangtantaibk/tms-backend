import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShipmentItem } from './entities/shipment-item.entity';
import { CreateShipmentItemDto } from './dto/create-shipment-item.dto';
import { UpdateShipmentItemDto } from './dto/update-shipment-item.dto';
import { Customer } from '../customers/entities/customer.entity';
import { ShipTo } from '../ship-to/entities/shipto.entity';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class ShipmentItemsService {
  constructor(
    @InjectRepository(ShipmentItem)
    private readonly repo: Repository<ShipmentItem>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(ShipTo)
    private readonly shipToRepo: Repository<ShipTo>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async create(dto: CreateShipmentItemDto) {
    const item = this.repo.create(dto);

    if (dto.customerId) {
      item.customer = await this.customerRepo.findOneBy({ id: dto.customerId });
    }
    if (dto.shipToId) {
      item.shipTo = await this.shipToRepo.findOneBy({ id: dto.shipToId });
    }
    if (dto.projectId) {
      item.project = await this.projectRepo.findOneBy({ id: dto.projectId });
    }

    return this.repo.save(item);
  }

  findAll() {
    return this.repo.find({ relations: ['customer', 'shipTo', 'project'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['customer', 'shipTo', 'project'] });
  }

  async update(id: string, dto: UpdateShipmentItemDto) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException('ShipmentItem not found');

    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: string) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException('ShipmentItem not found');
    item.isActive = false;
    return this.repo.save(item);
  }
}