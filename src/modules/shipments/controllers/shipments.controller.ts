// src/modules/shipments/controllers/shipments.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ShipmentsService } from '../services/shipments.service';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Get(':shipmentId')
  async getShipment(@Param('shipmentId') shipmentId: string) {
    return this.shipmentsService.getByShipmentId(shipmentId);
  }

  @Get()
  async listShipments(@Query() query: any) {
    return this.shipmentsService.list(query);
  }
}

