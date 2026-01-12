// src/modules/shipments/services/shipments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ShipmentsRepository } from '../repositories/shipment.repository';
import { ShipmentStateService } from './shipment-state.service';

@Injectable()
export class ShipmentsService {
  constructor(
    private readonly shipmentsRepo: ShipmentsRepository,
    private readonly stateService: ShipmentStateService,
  ) { }

  async getByShipmentId(shipmentId: string) {
    const shipment = await this.shipmentsRepo.findByShipmentId(shipmentId);
    if (!shipment) {
      throw new NotFoundException(`Shipment ${shipmentId} not found`);
    }
    return shipment;
  }

  async list(filters?: any) {
    return this.shipmentsRepo.list(filters);
  }

  /**
   * IMPORTANT:
   * This method ONLY validates transition.
   * Actual write logic will be added later when we
   * introduce controlled writes to cloned collections.
   */
  validateStatusChange(currentStatus: string, nextStatus: string) {
    this.stateService.validateTransition(currentStatus, nextStatus);
    return { valid: true };
  }
}

