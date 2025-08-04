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
exports.CreatePremiseReportDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const premise_report_entity_1 = require("../../../entities/premise-report.entity");
class CreatePremiseReportDto {
    journeyPlanId;
    premiseId;
    reportType = premise_report_entity_1.PremiseReportType.DAILY;
    securityLevel;
    cleanlinessRating;
    maintenanceRating;
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
}
exports.CreatePremiseReportDto = CreatePremiseReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Journey Plan ID' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePremiseReportDto.prototype, "journeyPlanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premise ID' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePremiseReportDto.prototype, "premiseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Type', enum: premise_report_entity_1.PremiseReportType }),
    (0, class_validator_1.IsEnum)(premise_report_entity_1.PremiseReportType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePremiseReportDto.prototype, "reportType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Security Level Rating (1-5)', minimum: 1, maximum: 5 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePremiseReportDto.prototype, "securityLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cleanliness Rating (1-5)', minimum: 1, maximum: 5 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePremiseReportDto.prototype, "cleanlinessRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Maintenance Rating (1-5)', minimum: 1, maximum: 5 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePremiseReportDto.prototype, "maintenanceRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Title' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePremiseReportDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Description' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePremiseReportDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report Notes' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePremiseReportDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Commendations' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePremiseReportDto.prototype, "commendations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Concerns' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePremiseReportDto.prototype, "concerns", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Recommendations' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePremiseReportDto.prototype, "recommendations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Action Items' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePremiseReportDto.prototype, "actionItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitude' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePremiseReportDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitude' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePremiseReportDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Photo URL' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePremiseReportDto.prototype, "photoUrl", void 0);
//# sourceMappingURL=create-premise-report.dto.js.map