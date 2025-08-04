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
exports.NoticeBoardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notice_board_service_1 = require("./notice-board.service");
const create_notice_board_dto_1 = require("./dto/create-notice-board.dto");
const update_notice_board_dto_1 = require("./dto/update-notice-board.dto");
const notice_board_entity_1 = require("../../entities/notice-board.entity");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let NoticeBoardController = class NoticeBoardController {
    noticeBoardService;
    constructor(noticeBoardService) {
        this.noticeBoardService = noticeBoardService;
    }
    create(createNoticeBoardDto) {
        return this.noticeBoardService.create(createNoticeBoardDto);
    }
    findAll() {
        return this.noticeBoardService.findAll();
    }
    findOne(id) {
        return this.noticeBoardService.findOne(+id);
    }
    update(id, updateNoticeBoardDto) {
        return this.noticeBoardService.update(+id, updateNoticeBoardDto);
    }
    remove(id) {
        return this.noticeBoardService.remove(+id);
    }
};
exports.NoticeBoardController = NoticeBoardController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new notice' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Notice created successfully', type: notice_board_entity_1.NoticeBoard }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notice_board_dto_1.CreateNoticeBoardDto]),
    __metadata("design:returntype", Promise)
], NoticeBoardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active notices' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notices retrieved successfully', type: [notice_board_entity_1.NoticeBoard] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NoticeBoardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific notice by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Notice ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notice retrieved successfully', type: notice_board_entity_1.NoticeBoard }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Notice not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NoticeBoardController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a notice' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Notice ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notice updated successfully', type: notice_board_entity_1.NoticeBoard }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Notice not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_notice_board_dto_1.UpdateNoticeBoardDto]),
    __metadata("design:returntype", Promise)
], NoticeBoardController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a notice (soft delete)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Notice ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notice deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Notice not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NoticeBoardController.prototype, "remove", null);
exports.NoticeBoardController = NoticeBoardController = __decorate([
    (0, swagger_1.ApiTags)('notice-board'),
    (0, common_1.Controller)('notice-board'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [notice_board_service_1.NoticeBoardService])
], NoticeBoardController);
//# sourceMappingURL=notice-board.controller.js.map