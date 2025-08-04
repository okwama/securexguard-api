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
exports.Region = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const country_entity_1 = require("./country.entity");
let Region = class Region {
    id;
    name;
    created_at;
    updated_at;
    country_id;
    country;
};
exports.Region = Region;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Region ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Region.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Region name' }),
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    __metadata("design:type", String)
], Region.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Region created at' }),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Region.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Region updated at' }),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Region.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country ID' }),
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Region.prototype, "country_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country),
    (0, typeorm_1.JoinColumn)({ name: 'country_id' }),
    __metadata("design:type", country_entity_1.Country)
], Region.prototype, "country", void 0);
exports.Region = Region = __decorate([
    (0, typeorm_1.Entity)('regions')
], Region);
//# sourceMappingURL=region.entity.js.map