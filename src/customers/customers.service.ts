import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customersRepository.create(createCustomerDto);
    return await this.customersRepository.save(customer);
  }

  async findAll(query: any = {}): Promise<{
    items: Customer[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.customersRepository.find({
        where: {
          ...(query.type && { type: query.type }),
          ...(query.status && { status: query.status }),
        },
        skip,
        take: limit,
        order: { createdAt: 'DESC' },
      }),
      this.customersRepository.count({
        where: {
          ...(query.type && { type: query.type }),
          ...(query.status && { status: query.status }),
        },
      }),
    ]);

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Customer> {
    return await this.customersRepository.findOneBy({ id });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    await this.customersRepository.update(id, updateCustomerDto);
    return this.findOne(id);
  }

  async softDelete(id: string): Promise<Customer> {
    await this.customersRepository.update(id, { status: 'closed' });
    return this.findOne(id);
  }

  async checkRelations(id: string): Promise<boolean> {
    // TODO: Implement checking relations with other objects
    // This should check relations with projects, transportation requests, etc.
    return false;
  }
} 