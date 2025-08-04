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
exports.Country = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const region_entity_1 = require("./region.entity");
let Country = class Country {
    id;
    name;
    code;
    created_at;
    updated_at;
    regions;
};
exports.Country = Country;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Country.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country name' }),
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    __metadata("design:type", String)
], Country.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country code' }),
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], Country.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country created at' }),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Country.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country updated at' }),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Country.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => region_entity_1.Region, region => region.country),
    __metadata("design:type", Array)
], Country.prototype, "regions", void 0);
exports.Country = Country = __decorate([
    (0, typeorm_1.Entity)('countries')
], Country);
//# sourceMappingURL=country.entity.js.map