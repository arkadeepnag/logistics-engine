// src/modules/shipments/controllers/shipments.controller.ts
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ShipmentsService } from '../services/shipments.service';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) { }

  @Patch(':shipmentId/status')
  updateStatus(
    @Param('shipmentId') shipmentId: string,
    @Body() body: { nextStatus: string; updatedBy: string },
  ) {
    return this.shipmentsService.updateStatus(
      shipmentId,
      body.nextStatus,
      body.updatedBy,
    );
  }
}
