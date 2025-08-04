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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const reports_service_1 = require("./reports.service");
const create_guard_report_dto_1 = require("./dto/create-guard-report.dto");
const create_premise_report_dto_1 = require("./dto/create-premise-report.dto");
const guard_report_entity_1 = require("../../entities/guard-report.entity");
const premise_report_entity_1 = require("../../entities/premise-report.entity");
const report_entity_1 = require("../../entities/report.entity");
let ReportsController = class ReportsController {
    reportsService;
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    async createGuardReport(createGuardReportDto, req) {
        console.log('🔵 BACKEND - Creating guard report');
        console.log('🔵 BACKEND - Request user:', req.user);
        console.log('🔵 BACKEND - Supervisor ID:', req.user?.staffId);
        console.log('🔵 BACKEND - Request body:', createGuardReportDto);
        return this.reportsService.createGuardReport(createGuardReportDto, req.user.staffId);
    }
    async getGuardReportsByJourneyPlan(journeyPlanId) {
        return this.reportsService.getGuardReportsByJourneyPlan(journeyPlanId);
    }
    async getGuardReportsByPremise(premiseId) {
        return this.reportsService.getGuardReportsByPremise(premiseId);
    }
    async deleteGuardReport(id, req) {
        return this.reportsService.deleteGuardReport(id, req.user.staffId);
    }
    async createPremiseReport(createPremiseReportDto, req) {
        return this.reportsService.createPremiseReport(createPremiseReportDto, req.user.staffId);
    }
    async getPremiseReportByJourneyPlan(journeyPlanId) {
        return this.reportsService.getPremiseReportByJourneyPlan(journeyPlanId);
    }
    async deletePremiseReport(id, req) {
        return this.reportsService.deletePremiseReport(id, req.user.staffId);
    }
    async getAllReportsByJourneyPlan(journeyPlanId) {
        return this.reportsService.getAllReportsByJourneyPlan(journeyPlanId);
    }
    async getReportsBySupervisorAndDate(dateString, req) {
        const date = new Date(dateString);
        return this.reportsService.getReportsBySupervisorAndDate(req.user.staffId, date);
    }
    async getReportsByPremiseAndDate(premiseId, dateString) {
        const date = new Date(dateString);
        return this.reportsService.getReportsByPremiseAndDate(premiseId, date);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Post)('guard'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a guard report' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Guard report created successfully', type: guard_report_entity_1.GuardReport }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_guard_report_dto_1.CreateGuardReportDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "createGuardReport", null);
__decorate([
    (0, common_1.Get)('guard/journey-plan/:journeyPlanId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all guard reports for a journey plan' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Guard reports retrieved successfully', type: [guard_report_entity_1.GuardReport] }),
    __param(0, (0, common_1.Param)('journeyPlanId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getGuardReportsByJourneyPlan", null);
__decorate([
    (0, common_1.Get)('guard/premise/:premiseId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all guard reports for a premise' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Guard reports retrieved successfully', type: [guard_report_entity_1.GuardReport] }),
    __param(0, (0, common_1.Param)('premiseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getGuardReportsByPremise", null);
__decorate([
    (0, common_1.Delete)('guard/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a guard report' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Guard report deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Guard report not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "deleteGuardReport", null);
__decorate([
    (0, common_1.Post)('premise'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a premise report' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Premise report created successfully', type: premise_report_entity_1.PremiseReport }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_premise_report_dto_1.CreatePremiseReportDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "createPremiseReport", null);
__decorate([
    (0, common_1.Get)('premise/journey-plan/:journeyPlanId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get premise report for a journey plan' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Premise report retrieved successfully', type: premise_report_entity_1.PremiseReport }),
    __param(0, (0, common_1.Param)('journeyPlanId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getPremiseReportByJourneyPlan", null);
__decorate([
    (0, common_1.Delete)('premise/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a premise report' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Premise report deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Premise report not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "deletePremiseReport", null);
__decorate([
    (0, common_1.Get)('journey-plan/:journeyPlanId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all reports for a journey plan' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reports retrieved successfully' }),
    __param(0, (0, common_1.Param)('journeyPlanId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllReportsByJourneyPlan", null);
__decorate([
    (0, common_1.Get)('supervisor/date'),
    (0, swagger_1.ApiOperation)({ summary: 'Get reports by supervisor and date' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reports retrieved successfully', type: [report_entity_1.Report] }),
    __param(0, (0, common_1.Query)('date')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getReportsBySupervisorAndDate", null);
__decorate([
    (0, common_1.Get)('premise/:premiseId/date'),
    (0, swagger_1.ApiOperation)({ summary: 'Get reports by premise and date' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reports retrieved successfully', type: [report_entity_1.Report] }),
    __param(0, (0, common_1.Param)('premiseId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getReportsByPremiseAndDate", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map