import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipToController } from './shipto.controller';
import { ShipToService } from './shipto.service';
import { ShipTo } from './entities/shipto.entity';
import { Project } from '../projects/entities/project.entity';
import { Customer } from '../customers/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShipTo, Project, Customer])],
  controllers: [ShipToController],
  providers: [ShipToService],
})
export class ShipToModule {}