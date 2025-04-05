import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShipToService } from './shipto.service';
import { CreateShipToDto } from './dto/create-shipto.dto';
import { UpdateShipToDto } from './dto/update-shipto.dto';

@ApiTags('ship-to')
@Controller('ship-to')
export class ShipToController {
  constructor(private readonly shipToService: ShipToService) {}

  @Post()
  create(@Body() dto: CreateShipToDto) {
    return this.shipToService.create(dto);
  }

  @Get()
  findAll() {
    return this.shipToService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipToService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateShipToDto) {
    return this.shipToService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipToService.remove(id);
  }
}