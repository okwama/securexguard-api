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
exports.Premises = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const journey_plan_entity_1 = require("./journey-plan.entity");
let Premises = class Premises {
    id;
    name;
    address;
    description;
    route_id;
    latitude;
    longitude;
    createdAt;
    updatedAt;
    journeyPlans;
};
exports.Premises = Premises;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premises ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Premises.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premises name' }),
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Premises.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premises address' }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Premises.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premises description' }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Premises.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Route ID' }),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Premises.prototype, "route_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premises latitude' }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Premises.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premises longitude' }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Premises.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premises created at' }),
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], Premises.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premises updated at' }),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt' }),
    __metadata("design:type", Date)
], Premises.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => journey_plan_entity_1.JourneyPlan, journeyPlan => journeyPlan.premise),
    __metadata("design:type", Array)
], Premises.prototype, "journeyPlans", void 0);
exports.Premises = Premises = __decorate([
    (0, typeorm_1.Entity)('premises')
], Premises);
//# sourceMappingURL=premises.entity.js.map