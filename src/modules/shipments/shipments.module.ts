// src/modules/shipments/shipments.module.ts
import { Module } from '@nestjs/common';
import { ShipmentsController } from './controllers/shipments.controller';
import { ShipmentsService } from './services/shipments.service';
import { ShipmentStateService } from './services/shipment-state.service';
import { ShipmentsRepository } from './repositories/shipment.repository';
import { ShipmentCollectionResolver } from '../../legacy/shipment-collection.resolver';

@Module({
  controllers: [ShipmentsController],
  providers: [
    ShipmentsService,
    ShipmentStateService,
    ShipmentsRepository,
    ShipmentCollectionResolver,
  ],
})
export class ShipmentsModule { }

