import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum LeaveType {
  SICK = 'sick',
  UNPAID = 'unpaid',
  ANNUAL = 'annual',
  COMPASSIONATE = 'compassionate',
}

export enum LeaveStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class CreateLeaveDto {
  @ApiProperty({ description: 'Guard ID requesting leave' })
  @IsNotEmpty()
  guardId: number;

  @ApiProperty({ description: 'Type of leave', enum: LeaveType })
  @IsEnum(LeaveType)
  leaveType: LeaveType;

  @ApiProperty({ description: 'Start date of leave (YYYY-MM-DD)' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'End date of leave (YYYY-MM-DD)' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ description: 'Reason for leave', required: false })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({ description: 'Attachment URL', required: false })
  @IsOptional()
  @IsString()
  attachmentUrl?: string;
} 