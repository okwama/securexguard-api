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
exports.GuardReport = exports.GuardReportStatus = exports.GuardReportType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const journey_plan_entity_1 = require("./journey-plan.entity");
const staff_entity_1 = require("./staff.entity");
const guard_entity_1 = require("./guard.entity");
const premises_entity_1 = require("./premises.entity");
var GuardReportType;
(function (GuardReportType) {
    GuardReportType["PERFORMANCE"] = "performance";
    GuardReportType["INCIDENT"] = "incident";
    GuardReportType["DAILY"] = "daily";
    GuardReportType["SPECIAL"] = "special";
})(GuardReportType || (exports.GuardReportType = GuardReportType = {}));
var GuardReportStatus;
(function (GuardReportStatus) {
    GuardReportStatus["DRAFT"] = "draft";
    GuardReportStatus["SUBMITTED"] = "submitted";
    GuardReportStatus["REVIEWED"] = "reviewed";
    GuardReportStatus["ARCHIVED"] = "archived";
})(GuardReportStatus || (exports.GuardReportStatus = GuardReportStatus = {}));
let GuardReport = class GuardReport {
    id;
    journeyPlanId;
    supervisorId;
    guardId;
    premiseId;
    reportType;
    status;
    appearanceRating;
    conductRating;
    alertnessRating;
    overallRating;
    notes;
    commendations;
    concerns;
    recommendations;
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
    guard;
    premise;
};
exports.GuardReport = GuardReport;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard Report ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GuardReport.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Journey Plan ID' }),
    (0, typeorm_1.Column)({ name: 'journey_plan_id' }),
    __metadata("design:type", Number)
], GuardReport.prototype, "journeyPlanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Supervisor ID' }),
    (0, typeorm_1.Column)({ name: 'supervisor_id' }),
    __metadata("design:type", Number)
], GuardReport.prototype, "supervisorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID' }),
    (0, typeorm_1.Column)({ name: 'guard_id' }),
    __metadata("design:type", Number)
], GuardReport.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premise ID' }),
    (0, typeorm_1.Column)({ name: 'premise_id' }),
    __metadata("design:type", Number)
], GuardReport.prototype, "premiseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Type', enum: GuardReportType }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: GuardReportType,
        name: 'report_type',
        default: GuardReportType.PERFORMANCE,
    }),
    __metadata("design:type", String)
], GuardReport.prototype, "reportType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Status', enum: GuardReportStatus }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: GuardReportStatus,
        default: GuardReportStatus.DRAFT,
    }),
    __metadata("design:type", String)
], GuardReport.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Appearance Rating' }),
    (0, typeorm_1.Column)({ name: 'appearance_rating', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], GuardReport.prototype, "appearanceRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Conduct Rating' }),
    (0, typeorm_1.Column)({ name: 'conduct_rating', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], GuardReport.prototype, "conductRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Alertness Rating' }),
    (0, typeorm_1.Column)({ name: 'alertness_rating', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], GuardReport.prototype, "alertnessRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Overall Rating' }),
    (0, typeorm_1.Column)({ name: 'overall_rating', type: 'decimal', precision: 3, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], GuardReport.prototype, "overallRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Notes' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], GuardReport.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Commendations' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], GuardReport.prototype, "commendations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Concerns' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], GuardReport.prototype, "concerns", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Recommendations' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], GuardReport.prototype, "recommendations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitude' }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], GuardReport.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitude' }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], GuardReport.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Photo URL' }),
    (0, typeorm_1.Column)({ name: 'photo_url', nullable: true }),
    __metadata("design:type", String)
], GuardReport.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Audio URL' }),
    (0, typeorm_1.Column)({ name: 'audio_url', nullable: true }),
    __metadata("design:type", String)
], GuardReport.prototype, "audioUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created At' }),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], GuardReport.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated At' }),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], GuardReport.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Submitted At' }),
    (0, typeorm_1.Column)({ name: 'submitted_at', nullable: true }),
    __metadata("design:type", Date)
], GuardReport.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reviewed At' }),
    (0, typeorm_1.Column)({ name: 'reviewed_at', nullable: true }),
    __metadata("design:type", Date)
], GuardReport.prototype, "reviewedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reviewed By' }),
    (0, typeorm_1.Column)({ name: 'reviewed_by', nullable: true }),
    __metadata("design:type", Number)
], GuardReport.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => journey_plan_entity_1.JourneyPlan),
    (0, typeorm_1.JoinColumn)({ name: 'journey_plan_id' }),
    __metadata("design:type", journey_plan_entity_1.JourneyPlan)
], GuardReport.prototype, "journeyPlan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff),
    (0, typeorm_1.JoinColumn)({ name: 'supervisor_id' }),
    __metadata("design:type", staff_entity_1.Staff)
], GuardReport.prototype, "supervisor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => guard_entity_1.Guard),
    (0, typeorm_1.JoinColumn)({ name: 'guard_id' }),
    __metadata("design:type", guard_entity_1.Guard)
], GuardReport.prototype, "guard", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => premises_entity_1.Premises),
    (0, typeorm_1.JoinColumn)({ name: 'premise_id' }),
    __metadata("design:type", premises_entity_1.Premises)
], GuardReport.prototype, "premise", void 0);
exports.GuardReport = GuardReport = __decorate([
    (0, typeorm_1.Entity)('guard_reports')
], GuardReport);
//# sourceMappingURL=guard-report.entity.js.map