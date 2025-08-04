import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    private configService;
    constructor(configService: ConfigService);
    uploadProfilePicture(file: Express.Multer.File): Promise<string>;
    deleteImage(publicId: string): Promise<void>;
}
