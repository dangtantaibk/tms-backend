import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { ExportHistory } from './entities/export-history.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExportHistory, User])],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {}