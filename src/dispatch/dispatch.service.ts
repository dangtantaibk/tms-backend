import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShipmentItem } from '../shipment-items/entities/shipment-item.entity';
import { Trip, TripStatus } from '../trips/entities/trip.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DispatchService {
  constructor(
    @InjectRepository(ShipmentItem)
    private readonly shipmentRepo: Repository<ShipmentItem>,
    @InjectRepository(Trip)
    private readonly tripRepo: Repository<Trip>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getUnassignedShipmentItems(projectId?: string) {
    const query = this.shipmentRepo
      .createQueryBuilder('item')
      .leftJoin('item.project', 'project')
      .leftJoin('item.trips', 'trips')
      .where('item.isActive = true')
      .andWhere('trips.id IS NULL');

    if (projectId) {
      query.andWhere('project.id = :projectId', { projectId });
    }

    return query.getMany();
  }

  async assignShipmentItems(payload: {
    shipmentItemIds: string[];
    tripId?: string;
    createNewTrip?: boolean;
    driverId?: string;
    vehicleId?: string;
  }) {
    const shipmentItems = await this.shipmentRepo.findByIds(payload.shipmentItemIds);

    let trip: Trip;

    if (payload.tripId) {
      trip = await this.tripRepo.findOne({ where: { id: payload.tripId }, relations: ['shipmentItems'] });
      if (!trip) throw new NotFoundException('Trip not found');
    } else if (payload.createNewTrip) {
      trip = new Trip();
      trip.status = TripStatus.DRAFT;
      trip.driver = await this.userRepo.findOneBy({ id: payload.driverId });
      trip.vehicle = await this.vehicleRepo.findOneBy({ id: payload.vehicleId });
      trip.shipmentItems = [];
    } else {
      throw new Error('Invalid dispatch action');
    }

    trip.shipmentItems = [...(trip.shipmentItems || []), ...shipmentItems];
    return this.tripRepo.save(trip);
  }

  async removeShipmentItemFromTrip(shipmentItemId: string, tripId: string) {
    const trip = await this.tripRepo.findOne({ where: { id: tripId }, relations: ['shipmentItems'] });
    if (!trip) throw new NotFoundException('Trip not found');

    trip.shipmentItems = trip.shipmentItems.filter((item) => item.id !== shipmentItemId);
    return this.tripRepo.save(trip);
  }
}
