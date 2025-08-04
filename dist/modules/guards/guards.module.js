"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const guards_controller_1 = require("./guards.controller");
const guards_service_1 = require("./guards.service");
const guard_entity_1 = require("../../entities/guard.entity");
const premises_entity_1 = require("../../entities/premises.entity");
let GuardsModule = class GuardsModule {
};
exports.GuardsModule = GuardsModule;
exports.GuardsModule = GuardsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([guard_entity_1.Guard, premises_entity_1.Premises,])],
        controllers: [guards_controller_1.GuardsController],
        providers: [guards_service_1.GuardsService],
        exports: [guards_service_1.GuardsService],
    })
], GuardsModule);
//# sourceMappingURL=guards.module.js.map