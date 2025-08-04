"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeBoardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const notice_board_service_1 = require("./notice-board.service");
const notice_board_controller_1 = require("./notice-board.controller");
const notice_board_entity_1 = require("../../entities/notice-board.entity");
let NoticeBoardModule = class NoticeBoardModule {
};
exports.NoticeBoardModule = NoticeBoardModule;
exports.NoticeBoardModule = NoticeBoardModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([notice_board_entity_1.NoticeBoard])],
        controllers: [notice_board_controller_1.NoticeBoardController],
        providers: [notice_board_service_1.NoticeBoardService],
        exports: [notice_board_service_1.NoticeBoardService],
    })
], NoticeBoardModule);
//# sourceMappingURL=notice-board.module.js.map