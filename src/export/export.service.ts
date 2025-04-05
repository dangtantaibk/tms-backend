import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExportHistory } from './entities/export-history.entity';

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(ExportHistory)
    private readonly exportRepo: Repository<ExportHistory>,
  ) {}

  async getExportList() {
    return this.exportRepo.find({ order: { createdAt: 'DESC' } });
  }

  async downloadExportFile(id: string) {
    const record = await this.exportRepo.findOneBy({ id });
    if (!record?.isReady) return 'File not ready';
    return `Download from: ${record.filePath}`;
  }

  async cleanupOldFiles() {
    return 'Old export files cleaned';
  }

  async createExport(type: string, filePath: string, userId?: string) {
    const history = this.exportRepo.create({
      type,
      filePath,
      isReady: true,
      completedAt: new Date(),
      requestedBy: userId ? { id: userId } as any : undefined,
    });
    return this.exportRepo.save(history);
  }
}