import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Staff } from '../../entities/staff.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Staff login' })
  @ApiResponse({ status: 200, description: 'Login successful', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('login-supervisor')
  @ApiOperation({ summary: 'Supervisor login' })
  @ApiResponse({ status: 200, description: 'Login successful', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 400, description: 'Access denied for non-supervisors' })
  async loginSupervisor(@Body() body: { identifier: string; password: string }): Promise<LoginResponseDto> {
    return this.authService.loginSupervisor(body.identifier, body.password);
  }

                @UseGuards(JwtAuthGuard)
              @Get('profile')
              @ApiBearerAuth()
              @ApiOperation({ summary: 'Get staff profile' })
              @ApiResponse({ status: 200, description: 'Profile retrieved successfully', type: Staff })
              @ApiResponse({ status: 401, description: 'Unauthorized' })
              async getProfile(@CurrentUser() user: any): Promise<Staff> {
                return this.authService.getProfile(user.staffId);
              }

              @UseGuards(JwtAuthGuard)
              @Post('profile/picture')
              @ApiBearerAuth()
              @ApiOperation({ summary: 'Update profile picture' })
              @ApiResponse({ status: 200, description: 'Profile picture updated successfully', type: Staff })
              @ApiResponse({ status: 401, description: 'Unauthorized' })
              async updateProfilePicture(
                @CurrentUser() user: any,
                @Body() body: { imageUrl: string }
              ): Promise<Staff> {
                return this.authService.updateProfilePicture(user.staffId, body.imageUrl);
              }
} 