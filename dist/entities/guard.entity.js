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
exports.Guard = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const premises_entity_1 = require("./premises.entity");
let Guard = class Guard {
    id;
    name;
    photoUrl;
    emplNo;
    idNo;
    phone;
    email;
    premiseId;
    status;
    createdAt;
    updatedAt;
    premise;
};
exports.Guard = Guard;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Guard.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Guard.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard photo URL' }),
    (0, typeorm_1.Column)({ name: 'photo_url' }),
    __metadata("design:type", String)
], Guard.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Employee number' }),
    (0, typeorm_1.Column)({ name: 'empl_no' }),
    __metadata("design:type", String)
], Guard.prototype, "emplNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID number' }),
    (0, typeorm_1.Column)({ name: 'id_no' }),
    __metadata("design:type", String)
], Guard.prototype, "idNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phone number' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Guard.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Guard.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premise ID' }),
    (0, typeorm_1.Column)({ name: 'premise_id', nullable: true }),
    __metadata("design:type", Object)
], Guard.prototype, "premiseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard status' }),
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Guard.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at' }),
    (0, typeorm_1.Column)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Guard.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated at' }),
    (0, typeorm_1.Column)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Guard.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => premises_entity_1.Premises),
    (0, typeorm_1.JoinColumn)({ name: 'premise_id' }),
    __metadata("design:type", premises_entity_1.Premises)
], Guard.prototype, "premise", void 0);
exports.Guard = Guard = __decorate([
    (0, typeorm_1.Entity)('guards')
], Guard);
//# sourceMappingURL=guard.entity.js.map