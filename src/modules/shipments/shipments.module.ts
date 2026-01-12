// src/modules/shipments/shipments.module.ts
import { Module } from '@nestjs/common';
import { ShipmentsController } from './controllers/shipments.controller';
import { ShipmentsService } from './services/shipments.service';
import { ShipmentStateService } from './services/shipment-state.service';
import { ShipmentsRepository } from './repositories/shipment.repository';
import { ShipmentCollectionResolver } from '../../legacy/shipment-collection.resolver';
// src/modules/shipments/shipments.module.ts
import { ShipmentPodService } from './services/shipment-pod.service';
import { ShipmentPodController } from './controllers/shipment-pod.controller';

@Module({
  controllers: [
    ShipmentsController,
    ShipmentPodController,
  ],
  providers: [
    ShipmentsService,
    ShipmentStateService,
    ShipmentsRepository,
    ShipmentPodService,
    ShipmentCollectionResolver,
  ],
})
export class ShipmentsModule { }
