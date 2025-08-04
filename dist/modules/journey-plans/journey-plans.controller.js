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
exports.JourneyPlansController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const journey_plans_service_1 = require("./journey-plans.service");
const create_journey_plan_dto_1 = require("./dto/create-journey-plan.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const journey_plan_entity_1 = require("../../entities/journey-plan.entity");
let JourneyPlansController = class JourneyPlansController {
    journeyPlansService;
    constructor(journeyPlansService) {
        this.journeyPlansService = journeyPlansService;
    }
    async create(createJourneyPlanDto, user) {
        return this.journeyPlansService.create(createJourneyPlanDto, user.staffId);
    }
    async getStaffJourneyPlans(user) {
        return this.journeyPlansService.getStaffJourneyPlans(user.staffId);
    }
    async getAllJourneyPlans(paginationDto) {
        return this.journeyPlansService.getAllJourneyPlans(paginationDto);
    }
    async validateQrCode(body, user) {
        return this.journeyPlansService.validateQrCode(body.qrCode, user.staffId);
    }
    async checkIn(id, checkInDto, user) {
        return this.journeyPlansService.checkIn(id, checkInDto, user.staffId);
    }
    async checkOut(id, checkOutDto, user) {
        console.log(`🔵 CHECKOUT CONTROLLER - Journey Plan ID: ${id}`);
        console.log(`🔵 CHECKOUT CONTROLLER - User: ${user.name} (ID: ${user.staffId})`);
        console.log(`🔵 CHECKOUT CONTROLLER - Payload:`, {
            latitude: checkOutDto.latitude,
            longitude: checkOutDto.longitude,
        });
        return this.journeyPlansService.checkOut(id, checkOutDto, user.staffId);
    }
    async getJourneyPlansByStatus(status) {
        return this.journeyPlansService.getJourneyPlansByStatus(status);
    }
    async getCurrentDayJourneyPlans(paginationDto, user) {
        return this.journeyPlansService.getCurrentDayJourneyPlans(paginationDto, user.staffId);
    }
    async deleteJourneyPlan(id, user) {
        return this.journeyPlansService.deleteJourneyPlan(id, user.staffId);
    }
};
exports.JourneyPlansController = JourneyPlansController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new journey plan' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Journey plan created successfully', type: journey_plan_entity_1.JourneyPlan }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_journey_plan_dto_1.CreateJourneyPlanDto, Object]),
    __metadata("design:returntype", Promise)
], JourneyPlansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get supervisor journey plans' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Journey plans retrieved successfully', type: [journey_plan_entity_1.JourneyPlan] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JourneyPlansController.prototype, "getStaffJourneyPlans", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all journey plans (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All journey plans retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], JourneyPlansController.prototype, "getAllJourneyPlans", null);
__decorate([
    (0, common_1.Post)('validate-qr'),
    (0, swagger_1.ApiOperation)({ summary: 'Validate QR code for premises' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'QR code validated successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JourneyPlansController.prototype, "validateQrCode", null);
__decorate([
    (0, common_1.Post)(':id/check-in'),
    (0, swagger_1.ApiOperation)({ summary: 'Check in to a journey plan' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Journey plan ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Check-in successful', type: journey_plan_entity_1.JourneyPlan }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_journey_plan_dto_1.CheckInDto, Object]),
    __metadata("design:returntype", Promise)
], JourneyPlansController.prototype, "checkIn", null);
__decorate([
    (0, common_1.Post)(':id/check-out'),
    (0, swagger_1.ApiOperation)({ summary: 'Check out from a journey plan' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Journey plan ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Check-out successful', type: journey_plan_entity_1.JourneyPlan }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_journey_plan_dto_1.CheckOutDto, Object]),
    __metadata("design:returntype", Promise)
], JourneyPlansController.prototype, "checkOut", null);
__decorate([
    (0, common_1.Get)('status/:status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get journey plans by status' }),
    (0, swagger_1.ApiParam)({ name: 'status', description: 'Journey plan status', enum: journey_plan_entity_1.RoutePlanStatus }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Journey plans retrieved successfully', type: [journey_plan_entity_1.JourneyPlan] }),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JourneyPlansController.prototype, "getJourneyPlansByStatus", null);
__decorate([
    (0, common_1.Get)('current-day'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current day journey plans' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Current day journey plans retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Object]),
    __metadata("design:returntype", Promise)
], JourneyPlansController.prototype, "getCurrentDayJourneyPlans", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a journey plan (pending only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Journey plan ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Journey plan deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot delete journey plan that is not pending' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Journey plan not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], JourneyPlansController.prototype, "deleteJourneyPlan", null);
exports.JourneyPlansController = JourneyPlansController = __decorate([
    (0, swagger_1.ApiTags)('journey-plans'),
    (0, common_1.Controller)('journey-plans'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [journey_plans_service_1.JourneyPlansService])
], JourneyPlansController);
//# sourceMappingURL=journey-plans.controller.js.map