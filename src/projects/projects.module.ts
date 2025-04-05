import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { Customer } from '../customers/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Customer])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}