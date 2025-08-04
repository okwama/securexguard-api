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
exports.CreateLeaveDto = exports.LeaveStatus = exports.LeaveType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var LeaveType;
(function (LeaveType) {
    LeaveType["SICK"] = "sick";
    LeaveType["UNPAID"] = "unpaid";
    LeaveType["ANNUAL"] = "annual";
    LeaveType["COMPASSIONATE"] = "compassionate";
})(LeaveType || (exports.LeaveType = LeaveType = {}));
var LeaveStatus;
(function (LeaveStatus) {
    LeaveStatus["PENDING"] = "pending";
    LeaveStatus["APPROVED"] = "approved";
    LeaveStatus["REJECTED"] = "rejected";
})(LeaveStatus || (exports.LeaveStatus = LeaveStatus = {}));
class CreateLeaveDto {
    guardId;
    leaveType;
    startDate;
    endDate;
    reason;
    attachmentUrl;
}
exports.CreateLeaveDto = CreateLeaveDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID requesting leave' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateLeaveDto.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type of leave', enum: LeaveType }),
    (0, class_validator_1.IsEnum)(LeaveType),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "leaveType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Start date of leave (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End date of leave (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reason for leave', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attachment URL', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "attachmentUrl", void 0);
//# sourceMappingURL=create-leave.dto.js.map