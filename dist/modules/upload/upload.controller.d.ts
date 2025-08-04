import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadProfilePicture(file: Express.Multer.File): Promise<{
        success: boolean;
        imageUrl: string;
        message: string;
    }>;
}
