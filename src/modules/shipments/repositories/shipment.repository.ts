// src/modules/shipments/repositories/shipments.repository.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ShipmentCollectionResolver } from '../../../legacy/shipment-collection.resolver';
import { resolveCollectionByStatus } from '../../../legacy/shipment-collection.selector';

@Injectable()
export class ShipmentsRepository {
  constructor(
    private readonly resolver: ShipmentCollectionResolver,
  ) { }

  async findByShipmentId(shipmentId: string) {
    return this.resolver.findByShipmentId(shipmentId);
  }

  async updateShipment(shipment: any, nextStatus: string) {
    const collectionName = resolveCollectionByStatus(nextStatus);
    const model: Model<any> = this.resolver.getModel(collectionName);

    return model.findOneAndUpdate(
      { shipment_id: shipment.shipment_id },
      shipment,
      { new: true },
    );
  }
}
