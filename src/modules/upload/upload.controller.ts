import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('upload')
@Controller('upload')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('profile-picture')
  @ApiOperation({ summary: 'Upload profile picture' })
  @ApiResponse({ status: 201, description: 'Profile picture uploaded successfully' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
      fileFilter: (req, file, cb) => {
        console.log('File received:', {
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size
        });
        
        // Check for image mimetypes more comprehensively
        const allowedMimeTypes = [
          'image/jpeg',
          'image/jpg', 
          'image/png',
          'image/gif',
          'image/webp',
          'image/bmp'
        ];
        
        if (!allowedMimeTypes.includes(file.mimetype)) {
          console.log('Invalid mimetype:', file.mimetype);
          return cb(new BadRequestException(`Only image files are allowed. Received: ${file.mimetype}`), false);
        }
        cb(null, true);
      },
    })
  )
  async uploadProfilePicture(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const imageUrl = await this.uploadService.uploadProfilePicture(file);
    
    return {
      success: true,
      imageUrl,
      message: 'Profile picture uploaded successfully',
    };
  }
} 