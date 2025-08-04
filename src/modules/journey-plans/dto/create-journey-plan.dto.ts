import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateJourneyPlanDto {
  @ApiProperty({ description: 'Premise ID' })
  @IsNumber()
  @IsNotEmpty()
  premiseId: number;

  @ApiProperty({ description: 'Route ID' })
  @IsNumber()
  @IsNotEmpty()
  routeId: number;
}

export class CheckInDto {
  @ApiProperty({ description: 'QR code' })
  @IsString()
  @IsNotEmpty()
  qrCode: string;

  @ApiProperty({ description: 'Latitude' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ description: 'Longitude' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @ApiPropertyOptional({ description: 'Accuracy' })
  @IsOptional()
  @IsNumber()
  accuracy?: number;
}

export class CheckOutDto {
  @ApiProperty({ description: 'Latitude' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ description: 'Longitude' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @ApiPropertyOptional({ description: 'Accuracy' })
  @IsOptional()
  @IsNumber()
  accuracy?: number;
} 