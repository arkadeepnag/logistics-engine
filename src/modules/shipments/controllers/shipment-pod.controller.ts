// src/modules/shipments/controllers/shipment-pod.controller.ts
import {
    Controller,
    Post,
    Param,
    UploadedFile,
    UseInterceptors,
    Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { podStorage } from '../pod/multer-pod.config';
import { ShipmentPodService } from '../services/shipment-pod.service';
import { File as MulterFile } from 'multer';

@Controller('shipments')
export class ShipmentPodController {
    constructor(private readonly podService: ShipmentPodService) { }

    @Post(':shipmentId/pod')
    @UseInterceptors(FileInterceptor('file', { storage: podStorage }))
    uploadPod(
        @Param('shipmentId') shipmentId: string,
        @UploadedFile() file: MulterFile,
        @Body() body: { notes?: string; deliveryTime?: string; uploadedBy: string },
    ) {
        return this.podService.uploadPod(
            shipmentId,
            file,
            body,
            body.uploadedBy,
        );
    }
}
