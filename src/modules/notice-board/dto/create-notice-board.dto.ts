import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoticeBoardDto {
  @ApiProperty({ description: 'Title of the notice' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Content of the notice' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'Whether the notice is active', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 