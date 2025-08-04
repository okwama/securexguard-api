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
exports.NoticeBoardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notice_board_entity_1 = require("../../entities/notice-board.entity");
let NoticeBoardService = class NoticeBoardService {
    noticeBoardRepository;
    constructor(noticeBoardRepository) {
        this.noticeBoardRepository = noticeBoardRepository;
    }
    async create(createNoticeBoardDto) {
        const notice = this.noticeBoardRepository.create(createNoticeBoardDto);
        return this.noticeBoardRepository.save(notice);
    }
    async findAll() {
        return this.noticeBoardRepository.find({
            where: { isActive: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const notice = await this.noticeBoardRepository.findOne({
            where: { id, isActive: true },
        });
        if (!notice) {
            throw new common_1.NotFoundException(`Notice with ID ${id} not found`);
        }
        return notice;
    }
    async update(id, updateNoticeBoardDto) {
        const notice = await this.findOne(id);
        Object.assign(notice, updateNoticeBoardDto);
        return this.noticeBoardRepository.save(notice);
    }
    async remove(id) {
        const notice = await this.findOne(id);
        notice.isActive = false;
        await this.noticeBoardRepository.save(notice);
    }
};
exports.NoticeBoardService = NoticeBoardService;
exports.NoticeBoardService = NoticeBoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notice_board_entity_1.NoticeBoard)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NoticeBoardService);
//# sourceMappingURL=notice-board.service.js.map