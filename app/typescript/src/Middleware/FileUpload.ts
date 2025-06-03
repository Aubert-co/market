import {  Request } from "express";
import multer from "multer";
import { ErrorMessage } from "../Helpers/ErrorMessage";

export class FileUploadError extends ErrorMessage {
    constructor(message: string = 'File upload failed.', statusCode: number = 400) {
        super(message, statusCode);
        this.name = 'FileUploadError';
    }
}
export const fileUpload = multer({
    storage: multer.memoryStorage(), // Usa memória para arquivos, ideal para GCS
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite de 5 MB
    },
    fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true); // Aceita o arquivo
        } else {
            // Rejeita o arquivo e lança um erro que será capturado pelo errorHandler
            cb(new FileUploadError('Only image files (JPEG, PNG, GIF, WebP) are allowed!')as Error  , false);
        }
    }
});

