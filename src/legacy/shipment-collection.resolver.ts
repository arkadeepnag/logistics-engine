// src/legacy/shipment-collection.resolver.ts
import { Model } from 'mongoose';

export class ShipmentCollectionResolver {
  constructor(
    private readonly createdModel: Model<any>,
    private readonly inTransitModel: Model<any>,
    private readonly outForDeliveryModel: Model<any>,
    private readonly deliveredModel: Model<any>,
    private readonly returnModel: Model<any>,
  ) { }

  getModel(name: string): Model<any> {
    const map = {
      created: this.createdModel,
      in_transit: this.inTransitModel,
      out_for_delivery: this.outForDeliveryModel,
      delivered: this.deliveredModel,
      return: this.returnModel,
    };

    const model = map[name];
    if (!model) throw new Error(`No model for collection ${name}`);
    return model;
  }

  async findByShipmentId(shipmentId: string) {
    return (
      (await this.createdModel.findOne({ shipment_id: shipmentId })) ||
      (await this.inTransitModel.findOne({ shipment_id: shipmentId })) ||
      (await this.outForDeliveryModel.findOne({ shipment_id: shipmentId })) ||
      (await this.deliveredModel.findOne({ shipment_id: shipmentId })) ||
      (await this.returnModel.findOne({ shipment_id: shipmentId }))
    );
  }
}
