import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip, TripStatus } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { User } from '../users/entities/user.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { ShipmentItem } from '../shipment-items/entities/shipment-item.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly repo: Repository<Trip>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
    @InjectRepository(ShipmentItem)
    private readonly itemRepo: Repository<ShipmentItem>,
  ) {}

  async create(dto: CreateTripDto) {
    const trip = new Trip();
    trip.vehicle = await this.vehicleRepo.findOneBy({ id: dto.vehicleId });
    trip.driver = await this.userRepo.findOneBy({ id: dto.driverId });
    trip.shipmentItems = await this.itemRepo.findByIds(dto.shipmentItemIds);
    trip.status = dto.status || TripStatus.DRAFT;
    return this.repo.save(trip);
  }

  findAll() {
    return this.repo.find({ relations: ['driver', 'vehicle', 'shipmentItems'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['driver', 'vehicle', 'shipmentItems'] });
  }

  async update(id: string, dto: UpdateTripDto) {
    const trip = await this.repo.findOneBy({ id });
    if (!trip) throw new NotFoundException('Trip not found');

    if (dto.vehicleId)
      trip.vehicle = await this.vehicleRepo.findOneBy({ id: dto.vehicleId });

    if (dto.driverId)
      trip.driver = await this.userRepo.findOneBy({ id: dto.driverId });

    if (dto.shipmentItemIds)
      trip.shipmentItems = await this.itemRepo.findByIds(dto.shipmentItemIds);

    Object.assign(trip, dto);
    return this.repo.save(trip);
  }

  async remove(id: string) {
    const trip = await this.repo.findOneBy({ id });
    if (!trip) throw new NotFoundException('Trip not found');
    trip.isActive = false;
    return this.repo.save(trip);
  }
}
