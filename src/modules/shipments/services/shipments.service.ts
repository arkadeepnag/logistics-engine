// src/modules/shipments/services/shipments.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ShipmentsRepository } from '../repositories/shipment.repository';
import { ShipmentStateService } from './shipment-state.service';

@Injectable()
export class ShipmentsService {
  constructor(
    private readonly repo: ShipmentsRepository,
    private readonly stateService: ShipmentStateService,
  ) { }

  async updateStatus(
    shipmentId: string,
    nextStatus: string,
    updatedBy: string,
  ) {
    const shipment = await this.repo.findByShipmentId(shipmentId);
    if (!shipment) {
      throw new NotFoundException('Shipment not found');
    }

    // 1️⃣ Validate transition
    this.stateService.validateTransition(shipment.status, nextStatus);

    // 2️⃣ Append history (IMMUTABLE)
    shipment.history.push({
      status: nextStatus,
      timestamp: new Date(),
      updatedBy,
    });

    // 3️⃣ Update state
    shipment.status = nextStatus;
    shipment.updatedAt = new Date();

    // 4️⃣ Persist safely
    return this.repo.updateShipment(shipment, nextStatus);
  }
}
