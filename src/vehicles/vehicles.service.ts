import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateVehicleDto) {
    const vehicle = this.vehicleRepo.create({
      ...dto,
    });

    if (dto.defaultDriverId) {
      vehicle.defaultDriver = await this.userRepo.findOneBy({ id: dto.defaultDriverId });
    }

    return this.vehicleRepo.save(vehicle);
  }

  findAll() {
    return this.vehicleRepo.find({ relations: ['defaultDriver'] });
  }

  findOne(id: string) {
    return this.vehicleRepo.findOne({ where: { id }, relations: ['defaultDriver'] });
  }

  async update(id: string, dto: UpdateVehicleDto) {
    const vehicle = await this.vehicleRepo.findOneBy({ id });
    if (!vehicle) throw new NotFoundException('Vehicle not found');

    Object.assign(vehicle, dto);

    if (dto.defaultDriverId) {
      vehicle.defaultDriver = await this.userRepo.findOneBy({ id: dto.defaultDriverId });
    }

    return this.vehicleRepo.save(vehicle);
  }

  async remove(id: string) {
    const vehicle = await this.vehicleRepo.findOneBy({ id });
    if (!vehicle) throw new NotFoundException('Vehicle not found');

    vehicle.isActive = false;
    return this.vehicleRepo.save(vehicle);
  }
}
