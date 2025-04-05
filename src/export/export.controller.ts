import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ExportService } from './export.service';

@ApiTags('export')
@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('list')
  @ApiOperation({ summary: 'Get list of export requests' })
  @ApiResponse({
    status: 200,
    description: 'Returns the list of all export requests'
  })
  listExportRequests() {
    return this.exportService.getExportList();
  }

  @Get('history')
  @ApiOperation({ summary: 'Get export history' })
  @ApiResponse({
    status: 200,
    description: 'Returns the export history'
  })
  getExportHistory() {
    return this.exportService.getExportList();
  }

  @Get('download')
  @ApiOperation({ summary: 'Download an export file' })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'ID of the export file to download'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the requested export file'
  })
  @ApiResponse({
    status: 404,
    description: 'Export file not found'
  })
  download(@Query('id') id: string) {
    return this.exportService.downloadExportFile(id);
  }

  @Post('cleanup')
  @ApiOperation({ summary: 'Clean up old export files' })
  @ApiResponse({
    status: 200,
    description: 'Successfully cleaned up old export files'
  })
  cleanupOldExports() {
    return this.exportService.cleanupOldFiles();
  }
}