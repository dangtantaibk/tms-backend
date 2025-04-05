import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hub } from './entities/hub.entity';
import { CreateHubDto } from './dto/create-hub.dto';
import { UpdateHubDto } from './dto/update-hub.dto';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class HubsService {
  constructor(
    @InjectRepository(Hub)
    private readonly hubRepo: Repository<Hub>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async create(dto: CreateHubDto) {
    const hub = this.hubRepo.create({
      name: dto.name,
      code: dto.code,
      address: dto.address,
    });

    if (dto.projectId) {
      hub.project = await this.projectRepo.findOneBy({ id: dto.projectId });
    }

    return this.hubRepo.save(hub);
  }

  findAll() {
    return this.hubRepo.find({ relations: ['project'] });
  }

  findOne(id: string) {
    return this.hubRepo.findOne({ where: { id }, relations: ['project'] });
  }

  async update(id: string, dto: UpdateHubDto) {
    const hub = await this.hubRepo.findOneBy({ id });
    if (!hub) throw new NotFoundException('Hub not found');

    Object.assign(hub, dto);
    return this.hubRepo.save(hub);
  }

  async remove(id: string) {
    const hub = await this.hubRepo.findOneBy({ id });
    if (!hub) throw new NotFoundException('Hub not found');

    hub.isActive = false;
    return this.hubRepo.save(hub);
  }
}