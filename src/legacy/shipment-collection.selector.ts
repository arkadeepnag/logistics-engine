// src/legacy/shipment-collection.selector.ts
import { ShipmentStatus } from '../modules/shipments/constants/shipment-status';

export function resolveCollectionByStatus(status: string) {
    switch (status) {
        case ShipmentStatus.CREATED:
            return 'created';
        case ShipmentStatus.IN_TRANSIT:
            return 'in_transit';
        case ShipmentStatus.OUT_FOR_DELIVERY:
            return 'out_for_delivery';
        case ShipmentStatus.DELIVERED:
            return 'delivered';
        case ShipmentStatus.RETURN:
            return 'return';
        default:
            throw new Error(`Unsupported shipment status: ${status}`);
    }
}
