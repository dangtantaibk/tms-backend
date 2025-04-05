import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DispatchService } from './dispatch.service';

@ApiTags('dispatch')
@Controller('dispatch')
export class DispatchController {
  constructor(private readonly dispatchService: DispatchService) {}

  @Get('unassigned')
  getUnassignedShipmentItems(@Query('projectId') projectId?: string) {
    return this.dispatchService.getUnassignedShipmentItems(projectId);
  }

  @Post('assign')
  assignToTrip(
    @Body()
    payload: {
      shipmentItemIds: string[];
      tripId?: string;
      createNewTrip?: boolean;
      driverId?: string;
      vehicleId?: string;
    },
  ) {
    return this.dispatchService.assignShipmentItems(payload);
  }
}