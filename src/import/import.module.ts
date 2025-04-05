import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { ImportHistory } from './entities/import-history.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImportHistory, User])],
  controllers: [ImportController],
  providers: [ImportService],
})
export class ImportModule {}
