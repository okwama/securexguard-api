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
exports.GuardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const guard_entity_1 = require("../../entities/guard.entity");
const premises_entity_1 = require("../../entities/premises.entity");
let GuardsService = class GuardsService {
    guardRepository;
    premisesRepository;
    constructor(guardRepository, premisesRepository) {
        this.guardRepository = guardRepository;
        this.premisesRepository = premisesRepository;
    }
    async getGuardsByPremise(premiseId) {
        console.log(`🔵 GET GUARDS REQUEST - Premise ID: ${premiseId}`);
        const premise = await this.premisesRepository.findOne({
            where: { id: premiseId },
        });
        if (!premise) {
            console.log(`❌ GET GUARDS ERROR - Premise not found with ID: ${premiseId}`);
            throw new common_1.NotFoundException('Premise not found');
        }
        console.log(`✅ Premise found: ${premise.name} (ID: ${premise.id})`);
        const allGuards = await this.guardRepository.find({
            where: { status: 1 },
            relations: ['premise'],
        });
        console.log(`📊 ALL ACTIVE GUARDS (${allGuards.length}):`);
        allGuards.forEach(guard => {
            console.log(`  - Guard ${guard.id}: ${guard.name} | Premise ID: ${guard.premiseId} | Premise: ${guard.premise?.name || 'NULL'}`);
        });
        const guards = await this.guardRepository
            .createQueryBuilder('guard')
            .leftJoinAndSelect('guard.premise', 'premise')
            .where('guard.premiseId = :premiseId', { premiseId })
            .andWhere('guard.status = :status', { status: 1 })
            .orderBy('guard.name', 'ASC')
            .getMany();
        console.log(`✅ GET GUARDS SUCCESS - Found ${guards.length} guards for premise ${premiseId}:`);
        guards.forEach(guard => {
            console.log(`  - ${guard.name} (ID: ${guard.id}) | Employee: ${guard.emplNo} | Premise: ${guard.premise?.name || 'NULL'}`);
        });
        return guards;
    }
    async getAllGuards() {
        console.log(`🔵 GET ALL GUARDS REQUEST`);
        const guards = await this.guardRepository.find({
            where: { status: 1 },
            relations: ['premise'],
            order: { name: 'ASC' },
        });
        console.log(`✅ GET ALL GUARDS SUCCESS - Found ${guards.length} guards`);
        return guards;
    }
    async getGuardById(id) {
        console.log(`🔵 GET GUARD REQUEST - Guard ID: ${id}`);
        const guard = await this.guardRepository.findOne({
            where: { id, status: 1 },
            relations: ['premise'],
        });
        if (!guard) {
            console.log(`❌ GET GUARD ERROR - Guard not found with ID: ${id}`);
            throw new common_1.NotFoundException('Guard not found');
        }
        console.log(`✅ GET GUARD SUCCESS - Found guard: ${guard.name}`);
        return guard;
    }
};
exports.GuardsService = GuardsService;
exports.GuardsService = GuardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(guard_entity_1.Guard)),
    __param(1, (0, typeorm_1.InjectRepository)(premises_entity_1.Premises)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GuardsService);
//# sourceMappingURL=guards.service.js.map