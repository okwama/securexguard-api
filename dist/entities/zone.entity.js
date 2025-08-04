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
exports.Zone = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const region_entity_1 = require("./region.entity");
let Zone = class Zone {
    id;
    name;
    region_id;
    created_at;
    updated_at;
    region;
};
exports.Zone = Zone;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Zone ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Zone.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Zone name' }),
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Zone.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Region ID' }),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Zone.prototype, "region_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Zone created at' }),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Zone.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Zone updated at' }),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Zone.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => region_entity_1.Region),
    (0, typeorm_1.JoinColumn)({ name: 'region_id' }),
    __metadata("design:type", region_entity_1.Region)
], Zone.prototype, "region", void 0);
exports.Zone = Zone = __decorate([
    (0, typeorm_1.Entity)('zones')
], Zone);
//# sourceMappingURL=zone.entity.js.map