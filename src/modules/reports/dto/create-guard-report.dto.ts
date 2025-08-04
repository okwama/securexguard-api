import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, IsNumber, Min, Max, IsDecimal } from 'class-validator';
import { GuardReportType } from '../../../entities/guard-report.entity';

export class CreateGuardReportDto {
  @ApiProperty({ description: 'Journey Plan ID' })
  @IsInt()
  journeyPlanId: number;

  @ApiProperty({ description: 'Guard ID' })
  @IsInt()
  guardId: number;

  @ApiProperty({ description: 'Premise ID' })
  @IsInt()
  premiseId: number;

  @ApiProperty({ description: 'Report Type', enum: GuardReportType })
  @IsEnum(GuardReportType)
  @IsOptional()
  reportType?: GuardReportType = GuardReportType.PERFORMANCE;

  // Performance Ratings (1-5 scale)
  @ApiProperty({ description: 'Appearance Rating (1-5)', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  appearanceRating?: number;

  @ApiProperty({ description: 'Conduct Rating (1-5)', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  conductRating?: number;

  @ApiProperty({ description: 'Alertness Rating (1-5)', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  alertnessRating?: number;

  // Report Content
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