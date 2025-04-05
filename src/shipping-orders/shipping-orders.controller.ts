import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShippingOrdersService } from './shipping-orders.service';
import { CreateShippingOrderDto } from './dto/create-shipping-order.dto';
import { UpdateShippingOrderDto } from './dto/update-shipping-order.dto';

@ApiTags('shipping-orders')
@Controller('shipping-orders')
export class ShippingOrdersController {
  constructor(private readonly service: ShippingOrdersService) {}

  @Post()
  create(@Body() dto: CreateShippingOrderDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateShippingOrderDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
