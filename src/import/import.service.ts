import { Injectable, BadRequestException } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImportHistory } from './entities/import-history.entity';

@Injectable()
export class ImportService {
  constructor(
    @InjectRepository(ImportHistory)
    private readonly importRepo: Repository<ImportHistory>,
  ) {}

  async processImport(file: Express.Multer.File) {
    const history = this.importRepo.create({
      type: 'shipment',
      fileName: file.originalname,
      status: 'processing',
    });
    const saved = await this.importRepo.save(history);

    try {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      saved.status = 'success';
      saved.completedAt = new Date();
      await this.importRepo.save(saved);

      return {
        status: 'success',
        message: 'File processed',
        preview: data.slice(0, 5),
      };
    } catch (error) {
      saved.status = 'failed';
      saved.errorMessage = error.message;
      saved.completedAt = new Date();
      await this.importRepo.save(saved);
      throw new BadRequestException('Invalid import file');
    }
  }

  async getImportHistory() {
    return this.importRepo.find({ order: { createdAt: 'DESC' } });
  }
}
