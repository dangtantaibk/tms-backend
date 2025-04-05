import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShipmentItemsService } from './shipment-items.service';
import { CreateShipmentItemDto } from './dto/create-shipment-item.dto';
import { UpdateShipmentItemDto } from './dto/update-shipment-item.dto';

@ApiTags('shipment-items')
@Controller('shipment-items')
export class ShipmentItemsController {
  constructor(private readonly service: ShipmentItemsService) {}

  @Post()
  create(@Body() dto: CreateShipmentItemDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateShipmentItemDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}