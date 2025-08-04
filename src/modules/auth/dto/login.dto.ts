import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'User email or phone number' })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ description: 'JWT access token' })
  token: string;

  @ApiProperty({ description: 'User information' })
  user: any;
} 