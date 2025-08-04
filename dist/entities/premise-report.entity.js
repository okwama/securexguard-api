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
exports.PremiseReport = exports.PremiseReportStatus = exports.PremiseReportType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const journey_plan_entity_1 = require("./journey-plan.entity");
const staff_entity_1 = require("./staff.entity");
const premises_entity_1 = require("./premises.entity");
var PremiseReportType;
(function (PremiseReportType) {
    PremiseReportType["DAILY"] = "daily";
    PremiseReportType["SECURITY"] = "security";
    PremiseReportType["MAINTENANCE"] = "maintenance";
    PremiseReportType["INCIDENT"] = "incident";
    PremiseReportType["SPECIAL"] = "special";
})(PremiseReportType || (exports.PremiseReportType = PremiseReportType = {}));
var PremiseReportStatus;
(function (PremiseReportStatus) {
    PremiseReportStatus["DRAFT"] = "draft";
    PremiseReportStatus["SUBMITTED"] = "submitted";
    PremiseReportStatus["REVIEWED"] = "reviewed";
    PremiseReportStatus["ARCHIVED"] = "archived";
})(PremiseReportStatus || (exports.PremiseReportStatus = PremiseReportStatus = {}));
let PremiseReport = class PremiseReport {
    id;
    journeyPlanId;
    supervisorId;
    premiseId;
    reportType;
    status;
    securityLevel;
    cleanlinessRating;
    maintenanceRating;
    overallRating;
    title;
    description;
    notes;
    commendations;
    concerns;
    recommendations;
    actionItems;
    latitude;
    longitude;
    photoUrl;
    audioUrl;
    createdAt;
    updatedAt;
    submittedAt;
    reviewedAt;
    reviewedBy;
    journeyPlan;
    supervisor;
    premise;
};
exports.PremiseReport = PremiseReport;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premise Report ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PremiseReport.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Journey Plan ID' }),
    (0, typeorm_1.Column)({ name: 'journey_plan_id' }),
    __metadata("design:type", Number)
], PremiseReport.prototype, "journeyPlanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Supervisor ID' }),
    (0, typeorm_1.Column)({ name: 'supervisor_id' }),
    __metadata("design:type", Number)
], PremiseReport.prototype, "supervisorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premise ID' }),
    (0, typeorm_1.Column)({ name: 'premise_id' }),
    __metadata("design:type", Number)
], PremiseReport.prototype, "premiseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Type', enum: PremiseReportType }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PremiseReportType,
        name: 'report_type',
        default: PremiseReportType.DAILY,
    }),
    __metadata("design:type", String)
], PremiseReport.prototype, "reportType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Status', enum: PremiseReportStatus }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PremiseReportStatus,
        default: PremiseReportStatus.DRAFT,
    }),
    __metadata("design:type", String)
], PremiseReport.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Security Level Rating' }),
    (0, typeorm_1.Column)({ name: 'security_level', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], PremiseReport.prototype, "securityLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cleanliness Rating' }),
    (0, typeorm_1.Column)({ name: 'cleanliness_rating', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], PremiseReport.prototype, "cleanlinessRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Maintenance Rating' }),
    (0, typeorm_1.Column)({ name: 'maintenance_rating', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], PremiseReport.prototype, "maintenanceRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Overall Rating' }),
    (0, typeorm_1.Column)({ name: 'overall_rating', type: 'decimal', precision: 3, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], PremiseReport.prototype, "overallRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Title' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PremiseReport.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Description' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PremiseReport.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Notes' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PremiseReport.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Commendations' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PremiseReport.prototype, "commendations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Concerns' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PremiseReport.prototype, "concerns", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Recommendations' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PremiseReport.prototype, "recommendations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Action Items' }),
    (0, typeorm_1.Column)({ name: 'action_items', type: 'text', nullable: true }),
    __metadata("design:type", String)
], PremiseReport.prototype, "actionItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitude' }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], PremiseReport.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitude' }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], PremiseReport.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Photo URL' }),
    (0, typeorm_1.Column)({ name: 'photo_url', nullable: true }),
    __metadata("design:type", String)
], PremiseReport.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Audio URL' }),
    (0, typeorm_1.Column)({ name: 'audio_url', nullable: true }),
    __metadata("design:type", String)
], PremiseReport.prototype, "audioUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created At' }),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PremiseReport.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated At' }),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PremiseReport.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Submitted At' }),
    (0, typeorm_1.Column)({ name: 'submitted_at', nullable: true }),
    __metadata("design:type", Date)
], PremiseReport.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reviewed At' }),
    (0, typeorm_1.Column)({ name: 'reviewed_at', nullable: true }),
    __metadata("design:type", Date)
], PremiseReport.prototype, "reviewedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reviewed By' }),
    (0, typeorm_1.Column)({ name: 'reviewed_by', nullable: true }),
    __metadata("design:type", Number)
], PremiseReport.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => journey_plan_entity_1.JourneyPlan),
    (0, typeorm_1.JoinColumn)({ name: 'journey_plan_id' }),
    __metadata("design:type", journey_plan_entity_1.JourneyPlan)
], PremiseReport.prototype, "journeyPlan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff),
    (0, typeorm_1.JoinColumn)({ name: 'supervisor_id' }),
    __metadata("design:type", staff_entity_1.Staff)
], PremiseReport.prototype, "supervisor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => premises_entity_1.Premises),
    (0, typeorm_1.JoinColumn)({ name: 'premise_id' }),
    __metadata("design:type", premises_entity_1.Premises)
], PremiseReport.prototype, "premise", void 0);
exports.PremiseReport = PremiseReport = __decorate([
    (0, typeorm_1.Entity)('premise_reports')
], PremiseReport);
//# sourceMappingURL=premise-report.entity.js.map