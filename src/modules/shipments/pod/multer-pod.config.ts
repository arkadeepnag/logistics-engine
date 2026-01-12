// src/modules/shipments/pod/multer-pod.config.ts
import { diskStorage } from 'multer';
import { extname } from 'path';

export const podStorage = diskStorage({
    destination: './uploads/pod',
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(
            null,
            `${req.params.shipmentId}-${unique}${extname(file.originalname)}`,
        );
    },
});
