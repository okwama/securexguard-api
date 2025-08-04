import { Controller, Get, Post, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JourneyPlansService } from './journey-plans.service';
import { CreateJourneyPlanDto, CheckInDto, CheckOutDto } from './dto/create-journey-plan.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JourneyPlan, RoutePlanStatus } from '../../entities/journey-plan.entity';

@ApiTags('journey-plans')
@Controller('journey-plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class JourneyPlansController {
  constructor(private readonly journeyPlansService: JourneyPlansService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new journey plan' })
  @ApiResponse({ status: 201, description: 'Journey plan created successfully', type: JourneyPlan })
  async create(
    @Body() createJourneyPlanDto: CreateJourneyPlanDto,
    @CurrentUser() user: any,
  ): Promise<JourneyPlan> {
    return this.journeyPlansService.create(createJourneyPlanDto, user.staffId);
  }

  @Get()
  @ApiOperation({ summary: 'Get supervisor journey plans' })
  @ApiResponse({ status: 200, description: 'Journey plans retrieved successfully', type: [JourneyPlan] })
  async getStaffJourneyPlans(@CurrentUser() user: any): Promise<JourneyPlan[]> {
    return this.journeyPlansService.getStaffJourneyPlans(user.staffId);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all journey plans (admin only)' })
  @ApiResponse({ status: 200, description: 'All journey plans retrieved successfully' })
  async getAllJourneyPlans(@Query() paginationDto: PaginationDto) {
    return this.journeyPlansService.getAllJourneyPlans(paginationDto);
  }

  @Post('validate-qr')
  @ApiOperation({ summary: 'Validate QR code for premises' })
  @ApiResponse({ status: 200, description: 'QR code validated successfully' })
  async validateQrCode(
    @Body() body: { qrCode: string },
    @CurrentUser() user: any,
  ) {
    return this.journeyPlansService.validateQrCode(body.qrCode, user.staffId);
  }

  @Post(':id/check-in')
  @ApiOperation({ summary: 'Check in to a journey plan' })
  @ApiParam({ name: 'id', description: 'Journey plan ID' })
  @ApiResponse({ status: 200, description: 'Check-in successful', type: JourneyPlan })
  async checkIn(
    @Param('id') id: number,
    @Body() checkInDto: CheckInDto,
    @CurrentUser() user: any,
  ): Promise<JourneyPlan> {
    return this.journeyPlansService.checkIn(id, checkInDto, user.staffId);
  }

  @Post(':id/check-out')
  @ApiOperation({ summary: 'Check out from a journey plan' })
  @ApiParam({ name: 'id', description: 'Journey plan ID' })
  @ApiResponse({ status: 200, description: 'Check-out successful', type: JourneyPlan })
  async checkOut(
    @Param('id') id: number,
    @Body() checkOutDto: CheckOutDto,
    @CurrentUser() user: any,
  ): Promise<JourneyPlan> {
    console.log(`🔵 CHECKOUT CONTROLLER - Journey Plan ID: ${id}`);
    console.log(`🔵 CHECKOUT CONTROLLER - User: ${user.name} (ID: ${user.staffId})`);
    console.log(`🔵 CHECKOUT CONTROLLER - Payload:`, {
      latitude: checkOutDto.latitude,
      longitude: checkOutDto.longitude,
    });
    
    return this.journeyPlansService.checkOut(id, checkOutDto, user.staffId);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get journey plans by status' })
  @ApiParam({ name: 'status', description: 'Journey plan status', enum: RoutePlanStatus })
  @ApiResponse({ status: 200, description: 'Journey plans retrieved successfully', type: [JourneyPlan] })
  async getJourneyPlansByStatus(@Param('status') status: RoutePlanStatus): Promise<JourneyPlan[]> {
    return this.journeyPlansService.getJourneyPlansByStatus(status);
  }

  @Get('current-day')
  @ApiOperation({ summary: 'Get current day journey plans' })
  @ApiResponse({ status: 200, description: 'Current day journey plans retrieved successfully' })
  async getCurrentDayJourneyPlans(
    @Query() paginationDto: PaginationDto,
    @CurrentUser() user: any,
  ) {
    return this.journeyPlansService.getCurrentDayJourneyPlans(paginationDto, user.staffId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a journey plan (pending only)' })
  @ApiParam({ name: 'id', description: 'Journey plan ID' })
  @ApiResponse({ status: 200, description: 'Journey plan deleted successfully' })
  @ApiResponse({ status: 400, description: 'Cannot delete journey plan that is not pending' })
  @ApiResponse({ status: 404, description: 'Journey plan not found' })
  async deleteJourneyPlan(
    @Param('id') id: number,
    @CurrentUser() user: any,
  ): Promise<{ message: string }> {
    return this.journeyPlansService.deleteJourneyPlan(id, user.staffId);
  }
} 