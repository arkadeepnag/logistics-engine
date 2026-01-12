// src/modules/shipments/repositories/shipments.repository.ts
import { Injectable } from '@nestjs/common';
import { ShipmentCollectionResolver } from '../../../legacy/shipment-collection.resolver';

@Injectable()
export class ShipmentsRepository {
  constructor(
    private readonly resolver: ShipmentCollectionResolver,
  ) {}

  async findByShipmentId(shipmentId: string) {
    return this.resolver.findByShipmentId(shipmentId);
  }

  async list(filters?: any) {
    return this.resolver.listAll(filters);
  }
}

