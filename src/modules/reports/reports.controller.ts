import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ReportsService } from './reports.service';
import { CreateGuardReportDto } from './dto/create-guard-report.dto';
import { CreatePremiseReportDto } from './dto/create-premise-report.dto';
import { GuardReport } from '../../entities/guard-report.entity';
import { PremiseReport } from '../../entities/premise-report.entity';
import { Report } from '../../entities/report.entity';

@ApiTags('Reports')
@Controller('reports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // Guard Reports
  @Post('guard')
  @ApiOperation({ summary: 'Create a guard report' })
  @ApiResponse({ status: 201, description: 'Guard report created successfully', type: GuardReport })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createGuardReport(
    @Body() createGuardReportDto: CreateGuardReportDto,
    @Request() req,
  ): Promise<GuardReport> {
    console.log('🔵 BACKEND - Creating guard report');
    console.log('🔵 BACKEND - Request user:', req.user);
    console.log('🔵 BACKEND - Supervisor ID:', req.user?.staffId);
    console.log('🔵 BACKEND - Request body:', createGuardReportDto);
    
    return this.reportsService.createGuardReport(createGuardReportDto, req.user.staffId);
  }

  @Get('guard/journey-plan/:journeyPlanId')
  @ApiOperation({ summary: 'Get all guard reports for a journey plan' })
  @ApiResponse({ status: 200, description: 'Guard reports retrieved successfully', type: [GuardReport] })
  async getGuardReportsByJourneyPlan(
    @Param('journeyPlanId', ParseIntPipe) journeyPlanId: number,
  ): Promise<GuardReport[]> {
    return this.reportsService.getGuardReportsByJourneyPlan(journeyPlanId);
  }

  @Get('guard/premise/:premiseId')
  @ApiOperation({ summary: 'Get all guard reports for a premise' })
  @ApiResponse({ status: 200, description: 'Guard reports retrieved successfully', type: [GuardReport] })
  async getGuardReportsByPremise(
    @Param('premiseId', ParseIntPipe) premiseId: number,
  ): Promise<GuardReport[]> {
    return this.reportsService.getGuardReportsByPremise(premiseId);
  }

  @Delete('guard/:id')
  @ApiOperation({ summary: 'Delete a guard report' })
  @ApiResponse({ status: 200, description: 'Guard report deleted successfully' })
  @ApiResponse({ status: 404, description: 'Guard report not found' })
  async deleteGuardReport(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<{ message: string }> {
    return this.reportsService.deleteGuardReport(id, req.user.staffId);
  }

  // Premise Reports
  @Post('premise')
  @ApiOperation({ summary: 'Create a premise report' })
  @ApiResponse({ status: 201, description: 'Premise report created successfully', type: PremiseReport })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createPremiseReport(
    @Body() createPremiseReportDto: CreatePremiseReportDto,
    @Request() req,
  ): Promise<PremiseReport> {
    return this.reportsService.createPremiseReport(createPremiseReportDto, req.user.staffId);
  }

  @Get('premise/journey-plan/:journeyPlanId')
  @ApiOperation({ summary: 'Get premise report for a journey plan' })
  @ApiResponse({ status: 200, description: 'Premise report retrieved successfully', type: PremiseReport })
  async getPremiseReportByJourneyPlan(
    @Param('journeyPlanId', ParseIntPipe) journeyPlanId: number,
  ): Promise<PremiseReport | null> {
    return this.reportsService.getPremiseReportByJourneyPlan(journeyPlanId);
  }

  @Delete('premise/:id')
  @ApiOperation({ summary: 'Delete a premise report' })
  @ApiResponse({ status: 200, description: 'Premise report deleted successfully' })
  @ApiResponse({ status: 404, description: 'Premise report not found' })
  async deletePremiseReport(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<{ message: string }> {
    return this.reportsService.deletePremiseReport(id, req.user.staffId);
  }

  // General Reports
  @Get('journey-plan/:journeyPlanId')
  @ApiOperation({ summary: 'Get all reports for a journey plan' })
  @ApiResponse({ status: 200, description: 'Reports retrieved successfully' })
  async getAllReportsByJourneyPlan(
    @Param('journeyPlanId', ParseIntPipe) journeyPlanId: number,
  ): Promise<{
    guardReports: GuardReport[];
    premiseReport: PremiseReport | null;
  }> {
    return this.reportsService.getAllReportsByJourneyPlan(journeyPlanId);
  }

  @Get('supervisor/date')
  @ApiOperation({ summary: 'Get reports by supervisor and date' })
  @ApiResponse({ status: 200, description: 'Reports retrieved successfully', type: [Report] })
  async getReportsBySupervisorAndDate(
    @Query('date') dateString: string,
    @Request() req,
  ): Promise<Report[]> {
    const date = new Date(dateString);
    return this.reportsService.getReportsBySupervisorAndDate(req.user.staffId, date);
  }

  @Get('premise/:premiseId/date')
  @ApiOperation({ summary: 'Get reports by premise and date' })
  @ApiResponse({ status: 200, description: 'Reports retrieved successfully', type: [Report] })
  async getReportsByPremiseAndDate(
    @Param('premiseId', ParseIntPipe) premiseId: number,
    @Query('date') dateString: string,
  ): Promise<Report[]> {
    const date = new Date(dateString);
    return this.reportsService.getReportsByPremiseAndDate(premiseId, date);
  }
} 