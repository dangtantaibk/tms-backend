import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Customer } from '../customers/entities/customer.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  async create(dto: CreateProjectDto) {
    const project = this.projectRepo.create({
      name: dto.name,
      code: dto.code,
      address: dto.address,
    });

    if (dto.customerId) {
      project.customer = await this.customerRepo.findOneBy({ id: dto.customerId });
    }

    return this.projectRepo.save(project);
  }

  findAll() {
    return this.projectRepo.find({ relations: ['customer'] });
  }

  findOne(id: string) {
    return this.projectRepo.findOne({ where: { id }, relations: ['customer'] });
  }

  async update(id: string, dto: UpdateProjectDto) {
    const project = await this.projectRepo.findOneBy({ id });
    if (!project) throw new NotFoundException('Project not found');

    Object.assign(project, dto);
    return this.projectRepo.save(project);
  }

  async remove(id: string) {
    const project = await this.projectRepo.findOneBy({ id });
    if (!project) throw new NotFoundException('Project not found');

    // soft delete
    project.isActive = false;
    return this.projectRepo.save(project);
  }
}