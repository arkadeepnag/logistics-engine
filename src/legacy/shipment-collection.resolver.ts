// src/legacy/shipment-collection.resolver.ts
import { Model } from 'mongoose';

export class ShipmentCollectionResolver {
  constructor(
    private readonly createdModel: Model<any>,
    private readonly inTransitModel: Model<any>,
    private readonly outForDeliveryModel: Model<any>,
    private readonly deliveredModel: Model<any>,
  ) {}

  async findByShipmentId(shipmentId: string) {
    return (
      (await this.createdModel.findOne({ shipment_id: shipmentId })) ||
      (await this.inTransitModel.findOne({ shipment_id: shipmentId })) ||
      (await this.outForDeliveryModel.findOne({ shipment_id: shipmentId })) ||
      (await this.deliveredModel.findOne({ shipment_id: shipmentId }))
    );
  }

  async listAll(filters: any = {}) {
    const [a, b, c, d] = await Promise.all([
      this.createdModel.find(filters),
      this.inTransitModel.find(filters),
      this.outForDeliveryModel.find(filters),
      this.deliveredModel.find(filters),
    ]);

    return [...a, ...b, ...c, ...d];
  }
}

