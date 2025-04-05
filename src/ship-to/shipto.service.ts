import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShipTo } from './entities/shipto.entity';
import { CreateShipToDto } from './dto/create-shipto.dto';
import { UpdateShipToDto } from './dto/update-shipto.dto';
import { Project } from '../projects/entities/project.entity';
import { Customer } from '../customers/entities/customer.entity';

@Injectable()
export class ShipToService {
  constructor(
    @InjectRepository(ShipTo)
    private readonly shipToRepo: Repository<ShipTo>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  async create(dto: CreateShipToDto) {
    const shipTo = this.shipToRepo.create({
      ...dto,
    });

    if (dto.projectId) {
      shipTo.project = await this.projectRepo.findOneBy({ id: dto.projectId });
    }
    if (dto.customerId) {
      shipTo.customer = await this.customerRepo.findOneBy({ id: dto.customerId });
    }

    return this.shipToRepo.save(shipTo);
  }

  findAll() {
    return this.shipToRepo.find({ relations: ['project', 'customer'] });
  }

  findOne(id: string) {
    return this.shipToRepo.findOne({ where: { id }, relations: ['project', 'customer'] });
  }

  async update(id: string, dto: UpdateShipToDto) {
    const shipTo = await this.shipToRepo.findOneBy({ id });
    if (!shipTo) throw new NotFoundException('ShipTo not found');

    Object.assign(shipTo, dto);
    return this.shipToRepo.save(shipTo);
  }

  async remove(id: string) {
    const shipTo = await this.shipToRepo.findOneBy({ id });
    if (!shipTo) throw new NotFoundException('ShipTo not found');

    shipTo.isActive = false;
    return this.shipToRepo.save(shipTo);
  }
}