import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HubsService } from './hubs.service';
import { CreateHubDto } from './dto/create-hub.dto';
import { UpdateHubDto } from './dto/update-hub.dto';

@ApiTags('hubs')
@Controller('hubs')
export class HubsController {
  constructor(private readonly hubsService: HubsService) {}

  @Post()
  create(@Body() dto: CreateHubDto) {
    return this.hubsService.create(dto);
  }

  @Get()
  findAll() {
    return this.hubsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hubsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHubDto) {
    return this.hubsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hubsService.remove(id);
  }
}
