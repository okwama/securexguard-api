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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = exports.ReportStatus = exports.ReportType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const journey_plan_entity_1 = require("./journey-plan.entity");
const staff_entity_1 = require("./staff.entity");
const premises_entity_1 = require("./premises.entity");
var ReportType;
(function (ReportType) {
    ReportType["PREMISE"] = "premise";
    ReportType["GUARD"] = "guard";
})(ReportType || (exports.ReportType = ReportType = {}));
var ReportStatus;
(function (ReportStatus) {
    ReportStatus["DRAFT"] = "draft";
    ReportStatus["SUBMITTED"] = "submitted";
    ReportStatus["REVIEWED"] = "reviewed";
    ReportStatus["ARCHIVED"] = "archived";
})(ReportStatus || (exports.ReportStatus = ReportStatus = {}));
let Report = class Report {
    id;
    routePlanId;
    supervisorId;
    premiseId;
    reportType;
    relatedReportId;
    status;
    createdAt;
    updatedAt;
    submittedAt;
    routePlan;
    supervisor;
    premise;
};
exports.Report = Report;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Report.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Route Plan ID' }),
    (0, typeorm_1.Column)({ name: 'route_plan_id' }),
    __metadata("design:type", Number)
], Report.prototype, "routePlanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Supervisor ID' }),
    (0, typeorm_1.Column)({ name: 'supervisor_id' }),
    __metadata("design:type", Number)
], Report.prototype, "supervisorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premise ID' }),
    (0, typeorm_1.Column)({ name: 'premise_id' }),
    __metadata("design:type", Number)
], Report.prototype, "premiseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Type', enum: ReportType }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ReportType,
        name: 'report_type',
    }),
    __metadata("design:type", String)
], Report.prototype, "reportType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Related Report ID' }),
    (0, typeorm_1.Column)({ name: 'related_report_id', nullable: true }),
    __metadata("design:type", Number)
], Report.prototype, "relatedReportId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Status', enum: ReportStatus }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ReportStatus,
        default: ReportStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Report.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created At' }),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Report.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated At' }),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Report.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Submitted At' }),
    (0, typeorm_1.Column)({ name: 'submitted_at', nullable: true }),
    __metadata("design:type", Date)
], Report.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => journey_plan_entity_1.JourneyPlan),
    (0, typeorm_1.JoinColumn)({ name: 'route_plan_id' }),
    __metadata("design:type", journey_plan_entity_1.JourneyPlan)
], Report.prototype, "routePlan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff),
    (0, typeorm_1.JoinColumn)({ name: 'supervisor_id' }),
    __metadata("design:type", staff_entity_1.Staff)
], Report.prototype, "supervisor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => premises_entity_1.Premises),
    (0, typeorm_1.JoinColumn)({ name: 'premise_id' }),
    __metadata("design:type", premises_entity_1.Premises)
], Report.prototype, "premise", void 0);
exports.Report = Report = __decorate([
    (0, typeorm_1.Entity)('reports')
], Report);
//# sourceMappingURL=report.entity.js.map