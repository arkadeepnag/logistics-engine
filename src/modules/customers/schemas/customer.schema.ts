// src/modules/customers/schemas/customer.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Customer extends Document {
    @Prop({ required: true, trim: true })
    customerName: string;

    @Prop()
    customerPhone: string;

    @Prop({ unique: true, sparse: true })
    customerGSTIN: string;

    @Prop({ default: 0 })
    minCharges: number;

    // 👇 FIXED
    @Prop({ type: [MongooseSchema.Types.Mixed], default: [] })
    addresses: any[];

    // 👇 FIXED (THIS WAS THE CRASH)
    @Prop({ type: MongooseSchema.Types.Mixed })
    billingAddress: any;

    @Prop({
        type: MongooseSchema.Types.Mixed,
        default: { type: 'owner', percent: 0 },
    })
    insurance: {
        type: 'owner' | 'carrier';
        percent: number;
    };

    // 👇 FIXED
    @Prop({ type: [MongooseSchema.Types.Mixed], default: [] })
    rateCards: any[];

    @Prop({ default: 0 })
    unpaidValue: number;

    @Prop({ default: false })
    isLocked: boolean;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    allowedBookingUsers: Types.ObjectId[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.pre('save', function () {
    if (this.insurance?.type === 'owner') {
        this.insurance.percent = 0;
    }
});

