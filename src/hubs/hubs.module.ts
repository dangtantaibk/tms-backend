import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HubsController } from './hubs.controller';
import { HubsService } from './hubs.service';
import { Hub } from './entities/hub.entity';
import { Project } from '../projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hub, Project])],
  controllers: [HubsController],
  providers: [HubsService],
})
export class HubsModule {}