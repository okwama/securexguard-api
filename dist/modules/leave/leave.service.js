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
exports.LeaveService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const leave_entity_1 = require("../../entities/leave.entity");
let LeaveService = class LeaveService {
    leaveRepository;
    constructor(leaveRepository) {
        this.leaveRepository = leaveRepository;
    }
    async create(createLeaveDto) {
        const leave = this.leaveRepository.create({
            ...createLeaveDto,
            startDate: new Date(createLeaveDto.startDate),
            endDate: new Date(createLeaveDto.endDate),
        });
        return this.leaveRepository.save(leave);
    }
    async findAll() {
        return this.leaveRepository.find({
            relations: ['guard', 'supervisor'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByGuard(guardId) {
        return this.leaveRepository.find({
            where: { guardId },
            relations: ['guard', 'supervisor'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const leave = await this.leaveRepository.findOne({
            where: { id },
            relations: ['guard', 'supervisor'],
        });
        if (!leave) {
            throw new common_1.NotFoundException(`Leave with ID ${id} not found`);
        }
        return leave;
    }
    async update(id, updateLeaveDto) {
        const leave = await this.findOne(id);
        const updateData = { ...updateLeaveDto };
        if (updateLeaveDto.startDate) {
            updateData.startDate = new Date(updateLeaveDto.startDate);
        }
        if (updateLeaveDto.endDate) {
            updateData.endDate = new Date(updateLeaveDto.endDate);
        }
        Object.assign(leave, updateData);
        return this.leaveRepository.save(leave);
    }
    async updateStatus(id, status) {
        const leave = await this.findOne(id);
        leave.status = status;
        return this.leaveRepository.save(leave);
    }
    async remove(id) {
        const leave = await this.findOne(id);
        await this.leaveRepository.remove(leave);
    }
};
exports.LeaveService = LeaveService;
exports.LeaveService = LeaveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(leave_entity_1.Leave)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LeaveService);
//# sourceMappingURL=leave.service.js.map