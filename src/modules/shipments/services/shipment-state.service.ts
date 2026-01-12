// src/modules/shipments/services/shipment-state.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { ShipmentStatus } from '../constants/shipment-status';

@Injectable()
export class ShipmentStateService {
  private readonly transitions = {
    [ShipmentStatus.CREATED]: [ShipmentStatus.IN_TRANSIT],
    [ShipmentStatus.IN_TRANSIT]: [ShipmentStatus.OUT_FOR_DELIVERY],
    [ShipmentStatus.OUT_FOR_DELIVERY]: [ShipmentStatus.DELIVERED, ShipmentStatus.RETURN],
  };

  validateTransition(from: string, to: string) {
    const allowed = this.transitions[from];
    if (!allowed || !allowed.includes(to)) {
      throw new BadRequestException(
        `Invalid shipment status transition from ${from} to ${to}`,
      );
    }
  }
}

