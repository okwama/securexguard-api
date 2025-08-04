import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Report } from '../../entities/report.entity';
import { GuardReport, GuardReportStatus } from '../../entities/guard-report.entity';
import { PremiseReport, PremiseReportStatus } from '../../entities/premise-report.entity';
import { CreateGuardReportDto } from './dto/create-guard-report.dto';
import { CreatePremiseReportDto } from './dto/create-premise-report.dto';
import { ReportType, ReportStatus } from '../../entities/report.entity';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    @InjectRepository(GuardReport)
    private guardReportRepository: Repository<GuardReport>,
    @InjectRepository(PremiseReport)
    private premiseReportRepository: Repository<PremiseReport>,
  ) {}

  // Guard Reports
  async createGuardReport(createGuardReportDto: CreateGuardReportDto, supervisorId: number): Promise<GuardReport> {
    this.logger.log(`Creating guard report for guard ${createGuardReportDto.guardId} by supervisor ${supervisorId}`);
    this.logger.log(`Supervisor ID type: ${typeof supervisorId}, value: ${supervisorId}`);

    // Calculate overall rating
    const ratings = [
      createGuardReportDto.appearanceRating,
      createGuardReportDto.conductRating,
      createGuardReportDto.alertnessRating,
    ].filter(rating => rating !== undefined && rating !== null);

    const overallRating = ratings.length > 0 
      ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
      : null;

    // Create guard report
    const guardReportData = {
      ...createGuardReportDto,
      supervisorId,
      status: GuardReportStatus.SUBMITTED,
      submittedAt: new Date(),
      ...(overallRating !== null && { overallRating }),
    };

    this.logger.log(`Guard report data: ${JSON.stringify(guardReportData, null, 2)}`);

    const insertResult = await this.guardReportRepository.insert(guardReportData);
    const savedGuardReport = await this.guardReportRepository.findOne({
      where: { id: insertResult.identifiers[0].id },
      relations: ['guard', 'supervisor', 'premise'],
    });

    if (!savedGuardReport) {
      throw new Error('Failed to create guard report');
    }

    // Create main report entry
    const mainReportData = {
      routePlanId: createGuardReportDto.journeyPlanId,
      supervisorId,
      premiseId: createGuardReportDto.premiseId,
      reportType: ReportType.GUARD,
      relatedReportId: savedGuardReport.id,
      status: ReportStatus.SUBMITTED,
      submittedAt: new Date(),
    };

    await this.reportRepository.insert(mainReportData);

    this.logger.log(`✅ Guard report created successfully with ID: ${savedGuardReport.id}`);
    return savedGuardReport;
  }

  async getGuardReportsByJourneyPlan(journeyPlanId: number): Promise<GuardReport[]> {
    this.logger.log(`Fetching guard reports for journey plan ${journeyPlanId}`);

    const reports = await this.guardReportRepository.find({
      where: { journeyPlanId },
      relations: ['guard', 'supervisor', 'premise'],
      order: { createdAt: 'DESC' },
    });

    this.logger.log(`Found ${reports.length} guard reports for journey plan ${journeyPlanId}`);
    return reports;
  }

  async getGuardReportsByPremise(premiseId: number): Promise<GuardReport[]> {
    this.logger.log(`Fetching guard reports for premise ${premiseId}`);

    const reports = await this.guardReportRepository.find({
      where: { premiseId },
      relations: ['guard', 'supervisor', 'premise'],
      order: { createdAt: 'DESC' },
    });

    this.logger.log(`Found ${reports.length} guard reports for premise ${premiseId}`);
    return reports;
  }

  // Premise Reports
  async createPremiseReport(createPremiseReportDto: CreatePremiseReportDto, supervisorId: number): Promise<PremiseReport> {
    this.logger.log(`Creating premise report for premise ${createPremiseReportDto.premiseId} by supervisor ${supervisorId}`);

    // Calculate overall rating
    const ratings = [
      createPremiseReportDto.securityLevel,
      createPremiseReportDto.cleanlinessRating,
      createPremiseReportDto.maintenanceRating,
    ].filter(rating => rating !== undefined && rating !== null);

    const overallRating = ratings.length > 0 
      ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
      : null;

    // Create premise report
    const premiseReportData = {
      ...createPremiseReportDto,
      supervisorId,
      status: PremiseReportStatus.SUBMITTED,
      submittedAt: new Date(),
      ...(overallRating !== null && { overallRating }),
    };

    const insertResult = await this.premiseReportRepository.insert(premiseReportData);
    const savedPremiseReport = await this.premiseReportRepository.findOne({
      where: { id: insertResult.identifiers[0].id },
      relations: ['supervisor', 'premise'],
    });

    if (!savedPremiseReport) {
      throw new Error('Failed to create premise report');
    }

    // Create main report entry
    const mainReportData = {
      routePlanId: createPremiseReportDto.journeyPlanId,
      supervisorId,
      premiseId: createPremiseReportDto.premiseId,
      reportType: ReportType.PREMISE,
      relatedReportId: savedPremiseReport.id,
      status: ReportStatus.SUBMITTED,
      submittedAt: new Date(),
    };

    await this.reportRepository.insert(mainReportData);

    this.logger.log(`✅ Premise report created successfully with ID: ${savedPremiseReport.id}`);
    return savedPremiseReport;
  }

  async getPremiseReportByJourneyPlan(journeyPlanId: number): Promise<PremiseReport | null> {
    this.logger.log(`Fetching premise report for journey plan ${journeyPlanId}`);

    const report = await this.premiseReportRepository.findOne({
      where: { journeyPlanId },
      relations: ['supervisor', 'premise'],
    });

    if (report) {
      this.logger.log(`Found premise report for journey plan ${journeyPlanId}`);
    } else {
      this.logger.log(`No premise report found for journey plan ${journeyPlanId}`);
    }

    return report;
  }

  // General Reports
  async getAllReportsByJourneyPlan(journeyPlanId: number): Promise<{
    guardReports: GuardReport[];
    premiseReport: PremiseReport | null;
  }> {
    this.logger.log(`Fetching all reports for journey plan ${journeyPlanId}`);

    const [guardReports, premiseReport] = await Promise.all([
      this.getGuardReportsByJourneyPlan(journeyPlanId),
      this.getPremiseReportByJourneyPlan(journeyPlanId),
    ]);

    this.logger.log(`Found ${guardReports.length} guard reports and ${premiseReport ? 1 : 0} premise report for journey plan ${journeyPlanId}`);

    return {
      guardReports,
      premiseReport,
    };
  }

  async getReportsBySupervisorAndDate(supervisorId: number, date: Date): Promise<Report[]> {
    this.logger.log(`Fetching reports for supervisor ${supervisorId} on ${date.toDateString()}`);

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const reports = await this.reportRepository.find({
      where: {
        supervisorId,
        createdAt: Between(startOfDay, endOfDay),
      },
      relations: ['routePlan', 'supervisor', 'premise'],
      order: { createdAt: 'DESC' },
    });

    this.logger.log(`Found ${reports.length} reports for supervisor ${supervisorId} on ${date.toDateString()}`);
    return reports;
  }

  async getReportsByPremiseAndDate(premiseId: number, date: Date): Promise<Report[]> {
    this.logger.log(`Fetching reports for premise ${premiseId} on ${date.toDateString()}`);

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const reports = await this.reportRepository.find({
      where: {
        premiseId,
        createdAt: Between(startOfDay, endOfDay),
      },
      relations: ['routePlan', 'supervisor', 'premise'],
      order: { createdAt: 'DESC' },
    });

    this.logger.log(`Found ${reports.length} reports for premise ${premiseId} on ${date.toDateString()}`);
    return reports;
  }

  // Delete Reports
  async deleteGuardReport(reportId: number, supervisorId: number): Promise<{ message: string }> {
    this.logger.log(`Deleting guard report ${reportId} by supervisor ${supervisorId}`);

    const report = await this.guardReportRepository.findOne({
      where: { id: reportId, supervisorId },
    });

    if (!report) {
      throw new NotFoundException(`Guard report ${reportId} not found or not authorized`);
    }

    // Delete main report entry
    await this.reportRepository.delete({
      reportType: ReportType.GUARD,
      relatedReportId: reportId,
    });

    // Delete guard report
    await this.guardReportRepository.remove(report);

    this.logger.log(`✅ Guard report ${reportId} deleted successfully`);
    return { message: 'Guard report deleted successfully' };
  }

  async deletePremiseReport(reportId: number, supervisorId: number): Promise<{ message: string }> {
    this.logger.log(`Deleting premise report ${reportId} by supervisor ${supervisorId}`);

    const report = await this.premiseReportRepository.findOne({
      where: { id: reportId, supervisorId },
    });

    if (!report) {
      throw new NotFoundException(`Premise report ${reportId} not found or not authorized`);
    }

    // Delete main report entry
    await this.reportRepository.delete({
      reportType: ReportType.PREMISE,
      relatedReportId: reportId,
    });

    // Delete premise report
    await this.premiseReportRepository.remove(report);

    this.logger.log(`✅ Premise report ${reportId} deleted successfully`);
    return { message: 'Premise report deleted successfully' };
  }
} 