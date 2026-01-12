// src/modules/shipments/services/shipment-pod.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { ShipmentsRepository } from '../repositories/shipment.repository';
import { File as MulterFile } from 'multer';

@Injectable()
export class ShipmentPodService {
    constructor(private readonly repo: ShipmentsRepository) { }

    async uploadPod(
        shipmentId: string,
        file: MulterFile,
        meta: { notes?: string; deliveryTime?: string },
        uploadedBy: string,
    ) {
        const shipment = await this.repo.findByShipmentId(shipmentId);
        if (!shipment) throw new BadRequestException('Shipment not found');

        // Status guard
        if (!['out_for_delivery', 'delivered'].includes(shipment.status)) {
            throw new BadRequestException(
                `POD upload not allowed in status ${shipment.status}`,
            );
        }

        const podPayload = {
            originalName: file.originalname,
            filePath: file.path,
            url: `/uploads/pod/${file.filename}`,
            uploadedAt: new Date(),
            fileSize: file.size,
            notes: meta?.notes || '',
            deliveryTime: meta?.deliveryTime || null,
            uploadedBy,
        };

        // Append or replace pod safely
        shipment.pod = podPayload;

        shipment.history.push({
            status: shipment.status,
            timestamp: new Date(),
            updatedBy: uploadedBy,
            action: 'POD_UPLOADED',
        });

        shipment.updatedAt = new Date();

        return this.repo.updateShipment(shipment, shipment.status);
    }
}
