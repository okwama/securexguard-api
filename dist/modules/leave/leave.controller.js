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
exports.LeaveController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const leave_service_1 = require("./leave.service");
const create_leave_dto_1 = require("./dto/create-leave.dto");
const update_leave_dto_1 = require("./dto/update-leave.dto");
const leave_entity_1 = require("../../entities/leave.entity");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let LeaveController = class LeaveController {
    leaveService;
    constructor(leaveService) {
        this.leaveService = leaveService;
    }
    create(createLeaveDto) {
        return this.leaveService.create(createLeaveDto);
    }
    findAll(guardId) {
        if (guardId) {
            return this.leaveService.findByGuard(+guardId);
        }
        return this.leaveService.findAll();
    }
    async getMyLeaves(guardId) {
        if (guardId) {
            return this.leaveService.findByGuard(+guardId);
        }
        return this.leaveService.findAll();
    }
    findOne(id) {
        return this.leaveService.findOne(+id);
    }
    update(id, updateLeaveDto) {
        return this.leaveService.update(+id, updateLeaveDto);
    }
    updateStatus(id, body) {
        return this.leaveService.updateStatus(+id, body.status);
    }
    remove(id) {
        return this.leaveService.remove(+id);
    }
};
exports.LeaveController = LeaveController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new leave application' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Leave application created successfully', type: leave_entity_1.Leave }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_dto_1.CreateLeaveDto]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all leave applications' }),
    (0, swagger_1.ApiQuery)({ name: 'guardId', required: false, description: 'Filter by guard ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave applications retrieved successfully', type: [leave_entity_1.Leave] }),
    __param(0, (0, common_1.Query)('guardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-leaves'),
    (0, swagger_1.ApiOperation)({ summary: 'Get leave applications for the authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave applications retrieved successfully', type: [leave_entity_1.Leave] }),
    __param(0, (0, common_1.Query)('guardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "getMyLeaves", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific leave application by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Leave ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave application retrieved successfully', type: leave_entity_1.Leave }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Leave application not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a leave application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Leave ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave application updated successfully', type: leave_entity_1.Leave }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Leave application not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_leave_dto_1.UpdateLeaveDto]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update leave application status' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Leave ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave status updated successfully', type: leave_entity_1.Leave }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Leave application not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a leave application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Leave ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave application deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Leave application not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "remove", null);
exports.LeaveController = LeaveController = __decorate([
    (0, swagger_1.ApiTags)('leave'),
    (0, common_1.Controller)('leave'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [leave_service_1.LeaveService])
], LeaveController);
//# sourceMappingURL=leave.controller.js.map