// src/modules/shipments/schemas/shipment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ strict: false, timestamps: true })
export class Shipment extends Document {
  @Prop({ unique: true })
  shipment_id: string;

  @Prop()
  status: string;

  @Prop()
  assigned_vehicle: any;

  @Prop()
  vehicle_no: string;

  @Prop()
  invoice_id: any;

  @Prop()
  invoiced: boolean;

  @Prop()
  manifestationType: string;

  @Prop({ type: Array })
  history: any[];

  @Prop()
  sellerDetails: any;

  @Prop()
  recipientDetails: any;

  @Prop()
  productList: any;

  @Prop()
  chargesAndPayments: any;

  @Prop()
  customerData: any;

  @Prop()
  pod: any;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);

