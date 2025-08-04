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
exports.CheckOutDto = exports.CheckInDto = exports.CreateJourneyPlanDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateJourneyPlanDto {
    premiseId;
    routeId;
}
exports.CreateJourneyPlanDto = CreateJourneyPlanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premise ID' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateJourneyPlanDto.prototype, "premiseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Route ID' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateJourneyPlanDto.prototype, "routeId", void 0);
class CheckInDto {
    qrCode;
    latitude;
    longitude;
    accuracy;
}
exports.CheckInDto = CheckInDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'QR code' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CheckInDto.prototype, "qrCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitude' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CheckInDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitude' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CheckInDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Accuracy' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CheckInDto.prototype, "accuracy", void 0);
class CheckOutDto {
    latitude;
    longitude;
    accuracy;
}
exports.CheckOutDto = CheckOutDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitude' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CheckOutDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitude' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CheckOutDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Accuracy' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CheckOutDto.prototype, "accuracy", void 0);
//# sourceMappingURL=create-journey-plan.dto.js.map