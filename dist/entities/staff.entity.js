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
exports.Staff = exports.StaffStatus = exports.StaffRole = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const premises_entity_1 = require("./premises.entity");
const sos_entity_1 = require("./sos.entity");
const journey_plan_entity_1 = require("./journey-plan.entity");
var StaffRole;
(function (StaffRole) {
    StaffRole[StaffRole["SUPERVISOR"] = 1] = "SUPERVISOR";
    StaffRole[StaffRole["GUARD"] = 2] = "GUARD";
})(StaffRole || (exports.StaffRole = StaffRole = {}));
var StaffStatus;
(function (StaffStatus) {
    StaffStatus[StaffStatus["INACTIVE"] = 0] = "INACTIVE";
    StaffStatus[StaffStatus["ACTIVE"] = 1] = "ACTIVE";
    StaffStatus[StaffStatus["SUSPENDED"] = 2] = "SUSPENDED";
    StaffStatus[StaffStatus["TERMINATED"] = 3] = "TERMINATED";
})(StaffStatus || (exports.StaffStatus = StaffStatus = {}));
let Staff = class Staff {
    id;
    name;
    phone;
    password;
    role_id;
    role;
    empl_no;
    id_no;
    photo_url;
    status;
    created_at;
    premisesId;
    routeId;
    zone_id;
    journeyPlans;
    sosAlerts;
    premises;
};
exports.Staff = Staff;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Staff ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Staff.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Staff name' }),
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Staff.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phone number' }),
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Hashed password' }),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role ID', enum: StaffRole }),
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Staff.prototype, "role_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role name' }),
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Employee number' }),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Staff.prototype, "empl_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID number' }),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Staff.prototype, "id_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Photo URL' }),
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Staff.prototype, "photo_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Staff status', enum: StaffStatus }),
    (0, typeorm_1.Column)({ type: 'int', default: StaffStatus.INACTIVE }),
    __metadata("design:type", Number)
], Staff.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at' }),
    (0, typeorm_1.Column)({ type: 'datetime', precision: 3, nullable: true }),
    __metadata("design:type", Date)
], Staff.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premises ID' }),
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Staff.prototype, "premisesId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Route ID' }),
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Staff.prototype, "routeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Zone ID' }),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Staff.prototype, "zone_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => journey_plan_entity_1.JourneyPlan, journeyPlan => journeyPlan.supervisor),
    __metadata("design:type", Array)
], Staff.prototype, "journeyPlans", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sos_entity_1.Sos, sos => sos.user),
    __metadata("design:type", Array)
], Staff.prototype, "sosAlerts", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => premises_entity_1.Premises),
    (0, typeorm_1.JoinColumn)({ name: 'premisesId' }),
    __metadata("design:type", premises_entity_1.Premises)
], Staff.prototype, "premises", void 0);
exports.Staff = Staff = __decorate([
    (0, typeorm_1.Entity)('staff')
], Staff);
//# sourceMappingURL=staff.entity.js.map