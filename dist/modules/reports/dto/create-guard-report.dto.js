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
exports.CreateGuardReportDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const guard_report_entity_1 = require("../../../entities/guard-report.entity");
class CreateGuardReportDto {
    journeyPlanId;
    guardId;
    premiseId;
    reportType = guard_report_entity_1.GuardReportType.PERFORMANCE;
    appearanceRating;
    conductRating;
    alertnessRating;
    notes;
    commendations;
    concerns;
    recommendations;
    latitude;
    longitude;
    photoUrl;
}
exports.CreateGuardReportDto = CreateGuardReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Journey Plan ID' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateGuardReportDto.prototype, "journeyPlanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateGuardReportDto.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premise ID' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateGuardReportDto.prototype, "premiseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Type', enum: guard_report_entity_1.GuardReportType }),
    (0, class_validator_1.IsEnum)(guard_report_entity_1.GuardReportType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateGuardReportDto.prototype, "reportType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Appearance Rating (1-5)', minimum: 1, maximum: 5 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateGuardReportDto.prototype, "appearanceRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Conduct Rating (1-5)', minimum: 1, maximum: 5 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateGuardReportDto.prototype, "conductRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Alertness Rating (1-5)', minimum: 1, maximum: 5 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateGuardReportDto.prototype, "alertnessRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Notes' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateGuardReportDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Commendations' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateGuardReportDto.prototype, "commendations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Concerns' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateGuardReportDto.prototype, "concerns", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Recommendations' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateGuardReportDto.prototype, "recommendations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitude' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateGuardReportDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitude' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateGuardReportDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Photo URL' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateGuardReportDto.prototype, "photoUrl", void 0);
//# sourceMappingURL=create-guard-report.dto.js.map