"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
let UploadService = class UploadService {
    configService;
    constructor(configService) {
        this.configService = configService;
        cloudinary_1.v2.config({
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
        });
    }
    async uploadProfilePicture(file) {
        try {
            const stream = new stream_1.Readable();
            stream.push(file.buffer);
            stream.push(null);
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                    folder: 'eguard/profile-pictures',
                    transformation: [
                        { width: 400, height: 400, crop: 'fill' },
                        { quality: 'auto' },
                    ],
                }, (error, result) => {
                    if (error)
                        reject(error);
                    else
                        resolve(result);
                });
                stream.pipe(uploadStream);
            });
            return result.secure_url;
        }
        catch (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        }
    }
    async deleteImage(publicId) {
        try {
            await cloudinary_1.v2.uploader.destroy(publicId);
        }
        catch (error) {
            throw new Error(`Failed to delete image: ${error.message}`);
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map