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
exports.Sos = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const staff_entity_1 = require("./staff.entity");
let Sos = class Sos {
    id;
    userId;
    residentId;
    latitude;
    longitude;
    status;
    notes;
    createdAt;
    updatedAt;
    premisesId;
    address;
    distressType;
    resolvedAt;
    userName;
    userPhone;
    sos_status;
    sosNotes;
    user;
};
exports.Sos = Sos;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SOS ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sos.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Sos.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Resident ID' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Sos.prototype, "residentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitude' }),
    (0, typeorm_1.Column)({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], Sos.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitude' }),
    (0, typeorm_1.Column)({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], Sos.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status' }),
    (0, typeorm_1.Column)({ length: 191, default: 'active' }),
    __metadata("design:type", String)
], Sos.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notes' }),
    (0, typeorm_1.Column)({ length: 191, nullable: true }),
    __metadata("design:type", String)
], Sos.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at' }),
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime', precision: 3 }),
    __metadata("design:type", Date)
], Sos.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated at' }),
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime', precision: 3 }),
    __metadata("design:type", Date)
], Sos.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premises ID' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Sos.prototype, "premisesId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Address' }),
    (0, typeorm_1.Column)({ length: 191, nullable: true }),
    __metadata("design:type", String)
], Sos.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Distress type' }),
    (0, typeorm_1.Column)({ length: 191, nullable: true }),
    __metadata("design:type", String)
], Sos.prototype, "distressType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Resolved at' }),
    (0, typeorm_1.Column)({ type: 'datetime', precision: 3, nullable: true }),
    __metadata("design:type", Date)
], Sos.prototype, "resolvedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User name' }),
    (0, typeorm_1.Column)({ length: 191, nullable: true }),
    __metadata("design:type", String)
], Sos.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User phone' }),
    (0, typeorm_1.Column)({ length: 191, nullable: true }),
    __metadata("design:type", String)
], Sos.prototype, "userPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SOS status' }),
    (0, typeorm_1.Column)({ length: 191, default: '0' }),
    __metadata("design:type", String)
], Sos.prototype, "sos_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SOS notes' }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Sos.prototype, "sosNotes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", staff_entity_1.Staff)
], Sos.prototype, "user", void 0);
exports.Sos = Sos = __decorate([
    (0, typeorm_1.Entity)('sos')
], Sos);
//# sourceMappingURL=sos.entity.js.map