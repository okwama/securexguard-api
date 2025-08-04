"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ReportsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const report_entity_1 = require("../../entities/report.entity");
const guard_report_entity_1 = require("../../entities/guard-report.entity");
const premise_report_entity_1 = require("../../entities/premise-report.entity");
const report_entity_2 = require("../../entities/report.entity");
let ReportsService = ReportsService_1 = class ReportsService {
    reportRepository;
    guardReportRepository;
    premiseReportRepository;
    logger = new common_1.Logger(ReportsService_1.name);
    constructor(reportRepository, guardReportRepository, premiseReportRepository) {
        this.reportRepository = reportRepository;
        this.guardReportRepository = guardReportRepository;
        this.premiseReportRepository = premiseReportRepository;
    }
    async createGuardReport(createGuardReportDto, supervisorId) {
        this.logger.log(`Creating guard report for guard ${createGuardReportDto.guardId} by supervisor ${supervisorId}`);
        this.logger.log(`Supervisor ID type: ${typeof supervisorId}, value: ${supervisorId}`);
        const ratings = [
            createGuardReportDto.appearanceRating,
            createGuardReportDto.conductRating,
            createGuardReportDto.alertnessRating,
        ].filter(rating => rating !== undefined && rating !== null);
        const overallRating = ratings.length > 0
            ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
            : null;
        const guardReportData = {
            ...createGuardReportDto,
            supervisorId,
            status: guard_report_entity_1.GuardReportStatus.SUBMITTED,
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
        const mainReportData = {
            routePlanId: createGuardReportDto.journeyPlanId,
            supervisorId,
            premiseId: createGuardReportDto.premiseId,
            reportType: report_entity_2.ReportType.GUARD,
            relatedReportId: savedGuardReport.id,
            status: report_entity_2.ReportStatus.SUBMITTED,
            submittedAt: new Date(),
        };
        await this.reportRepository.insert(mainReportData);
        this.logger.log(`✅ Guard report created successfully with ID: ${savedGuardReport.id}`);
        return savedGuardReport;
    }
    async getGuardReportsByJourneyPlan(journeyPlanId) {
        this.logger.log(`Fetching guard reports for journey plan ${journeyPlanId}`);
        const reports = await this.guardReportRepository.find({
            where: { journeyPlanId },
            relations: ['guard', 'supervisor', 'premise'],
            order: { createdAt: 'DESC' },
        });
        this.logger.log(`Found ${reports.length} guard reports for journey plan ${journeyPlanId}`);
        return reports;
    }
    async getGuardReportsByPremise(premiseId) {
        this.logger.log(`Fetching guard reports for premise ${premiseId}`);
        const reports = await this.guardReportRepository.find({
            where: { premiseId },
            relations: ['guard', 'supervisor', 'premise'],
            order: { createdAt: 'DESC' },
        });
        this.logger.log(`Found ${reports.length} guard reports for premise ${premiseId}`);
        return reports;
    }
    async createPremiseReport(createPremiseReportDto, supervisorId) {
        this.logger.log(`Creating premise report for premise ${createPremiseReportDto.premiseId} by supervisor ${supervisorId}`);
        const ratings = [
            createPremiseReportDto.securityLevel,
            createPremiseReportDto.cleanlinessRating,
            createPremiseReportDto.maintenanceRating,
        ].filter(rating => rating !== undefined && rating !== null);
        const overallRating = ratings.length > 0
            ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
            : null;
        const premiseReportData = {
            ...createPremiseReportDto,
            supervisorId,
            status: premise_report_entity_1.PremiseReportStatus.SUBMITTED,
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
        const mainReportData = {
            routePlanId: createPremiseReportDto.journeyPlanId,
            supervisorId,
            premiseId: createPremiseReportDto.premiseId,
            reportType: report_entity_2.ReportType.PREMISE,
            relatedReportId: savedPremiseReport.id,
            status: report_entity_2.ReportStatus.SUBMITTED,
            submittedAt: new Date(),
        };
        await this.reportRepository.insert(mainReportData);
        this.logger.log(`✅ Premise report created successfully with ID: ${savedPremiseReport.id}`);
        return savedPremiseReport;
    }
    async getPremiseReportByJourneyPlan(journeyPlanId) {
        this.logger.log(`Fetching premise report for journey plan ${journeyPlanId}`);
        const report = await this.premiseReportRepository.findOne({
            where: { journeyPlanId },
            relations: ['supervisor', 'premise'],
        });
        if (report) {
            this.logger.log(`Found premise report for journey plan ${journeyPlanId}`);
        }
        else {
            this.logger.log(`No premise report found for journey plan ${journeyPlanId}`);
        }
        return report;
    }
    async getAllReportsByJourneyPlan(journeyPlanId) {
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
    async getReportsBySupervisorAndDate(supervisorId, date) {
        this.logger.log(`Fetching reports for supervisor ${supervisorId} on ${date.toDateString()}`);
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const reports = await this.reportRepository.find({
            where: {
                supervisorId,
                createdAt: (0, typeorm_2.Between)(startOfDay, endOfDay),
            },
            relations: ['routePlan', 'supervisor', 'premise'],
            order: { createdAt: 'DESC' },
        });
        this.logger.log(`Found ${reports.length} reports for supervisor ${supervisorId} on ${date.toDateString()}`);
        return reports;
    }
    async getReportsByPremiseAndDate(premiseId, date) {
        this.logger.log(`Fetching reports for premise ${premiseId} on ${date.toDateString()}`);
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const reports = await this.reportRepository.find({
            where: {
                premiseId,
                createdAt: (0, typeorm_2.Between)(startOfDay, endOfDay),
            },
            relations: ['routePlan', 'supervisor', 'premise'],
            order: { createdAt: 'DESC' },
        });
        this.logger.log(`Found ${reports.length} reports for premise ${premiseId} on ${date.toDateString()}`);
        return reports;
    }
    async deleteGuardReport(reportId, supervisorId) {
        this.logger.log(`Deleting guard report ${reportId} by supervisor ${supervisorId}`);
        const report = await this.guardReportRepository.findOne({
            where: { id: reportId, supervisorId },
        });
        if (!report) {
            throw new common_1.NotFoundException(`Guard report ${reportId} not found or not authorized`);
        }
        await this.reportRepository.delete({
            reportType: report_entity_2.ReportType.GUARD,
            relatedReportId: reportId,
        });
        await this.guardReportRepository.remove(report);
        this.logger.log(`✅ Guard report ${reportId} deleted successfully`);
        return { message: 'Guard report deleted successfully' };
    }
    async deletePremiseReport(reportId, supervisorId) {
        this.logger.log(`Deleting premise report ${reportId} by supervisor ${supervisorId}`);
        const report = await this.premiseReportRepository.findOne({
            where: { id: reportId, supervisorId },
        });
        if (!report) {
            throw new common_1.NotFoundException(`Premise report ${reportId} not found or not authorized`);
        }
        await this.reportRepository.delete({
            reportType: report_entity_2.ReportType.PREMISE,
            relatedReportId: reportId,
        });
        await this.premiseReportRepository.remove(report);
        this.logger.log(`✅ Premise report ${reportId} deleted successfully`);
        return { message: 'Premise report deleted successfully' };
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = ReportsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __param(1, (0, typeorm_1.InjectRepository)(guard_report_entity_1.GuardReport)),
    __param(2, (0, typeorm_1.InjectRepository)(premise_report_entity_1.PremiseReport)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportsService);
//# sourceMappingURL=reports.service.js.map