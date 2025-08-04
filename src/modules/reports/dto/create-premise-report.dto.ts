import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { PremiseReportType } from '../../../entities/premise-report.entity';

export class CreatePremiseReportDto {
  @ApiProperty({ description: 'Journey Plan ID' })
  @IsInt()
  journeyPlanId: number;

  @ApiProperty({ description: 'Premise ID' })
  @IsInt()
  premiseId: number;

  @ApiProperty({ description: 'Report Type', enum: PremiseReportType })
  @IsEnum(PremiseReportType)
  @IsOptional()
  reportType?: PremiseReportType = PremiseReportType.DAILY;

  // Premise Assessment Ratings (1-5 scale)
  @ApiProperty({ description: 'Security Level Rating (1-5)', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  securityLevel?: number;

  @ApiProperty({ description: 'Cleanliness Rating (1-5)', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  cleanlinessRating?: number;

  @ApiProperty({ description: 'Maintenance Rating (1-5)', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  maintenanceRating?: number;

  // Report Content
  @ApiProperty({ description: 'Report Title' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Report Description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Report Notes' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ description: 'Commendations' })
  @IsString()
  @IsOptional()
  commendations?: string;

  @ApiProperty({ description: 'Concerns' })
  @IsString()
  @IsOptional()
  concerns?: string;

  @ApiProperty({ description: 'Recommendations' })
  @IsString()
  @IsOptional()
  recommendations?: string;

  @ApiProperty({ description: 'Action Items' })
  @IsString()
  @IsOptional()
  actionItems?: string;

  // Location
  @ApiProperty({ description: 'Latitude' })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty({ description: 'Longitude' })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty({ description: 'Photo URL' })
  @IsString()
  @IsOptional()
  photoUrl?: string;
} 