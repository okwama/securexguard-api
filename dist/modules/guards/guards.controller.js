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
exports.GuardsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_service_1 = require("./guards.service");
const guard_entity_1 = require("../../entities/guard.entity");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let GuardsController = class GuardsController {
    guardsService;
    constructor(guardsService) {
        this.guardsService = guardsService;
    }
    async testGuardsModule() {
        console.log('🔵 GUARDS MODULE TEST - Endpoint called successfully');
        return {
            message: 'Guards module is working!',
            timestamp: new Date().toISOString(),
        };
    }
    async getAllGuards() {
        return this.guardsService.getAllGuards();
    }
    async getGuardsByPremise(premiseId) {
        return this.guardsService.getGuardsByPremise(premiseId);
    }
    async getGuardById(id) {
        return this.guardsService.getGuardById(id);
    }
};
exports.GuardsController = GuardsController;
__decorate([
    (0, common_1.Get)('test'),
    (0, swagger_1.ApiOperation)({ summary: 'Test endpoint to verify guards module is working' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Guards module is working' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "testGuardsModule", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active guards' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All guards retrieved successfully', type: [guard_entity_1.Guard] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "getAllGuards", null);
__decorate([
    (0, common_1.Get)('premises/:premiseId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get guards assigned to a specific premise' }),
    (0, swagger_1.ApiParam)({ name: 'premiseId', description: 'Premise ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Guards retrieved successfully', type: [guard_entity_1.Guard] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Premise not found' }),
    __param(0, (0, common_1.Param)('premiseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "getGuardsByPremise", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific guard by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Guard ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Guard retrieved successfully', type: guard_entity_1.Guard }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Guard not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "getGuardById", null);
exports.GuardsController = GuardsController = __decorate([
    (0, swagger_1.ApiTags)('guards'),
    (0, common_1.Controller)('guards'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [guards_service_1.GuardsService])
], GuardsController);
//# sourceMappingURL=guards.controller.js.map