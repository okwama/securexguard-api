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
exports.JourneyPlan = exports.RoutePlanStatus = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const staff_entity_1 = require("./staff.entity");
const premises_entity_1 = require("./premises.entity");
var RoutePlanStatus;
(function (RoutePlanStatus) {
    RoutePlanStatus[RoutePlanStatus["PENDING"] = 0] = "PENDING";
    RoutePlanStatus[RoutePlanStatus["IN_PROGRESS"] = 1] = "IN_PROGRESS";
    RoutePlanStatus[RoutePlanStatus["COMPLETED"] = 2] = "COMPLETED";
    RoutePlanStatus[RoutePlanStatus["CANCELLED"] = 3] = "CANCELLED";
})(RoutePlanStatus || (exports.RoutePlanStatus = RoutePlanStatus = {}));
let JourneyPlan = class JourneyPlan {
    id;
    supervisorId;
    status;
    checkin_latitude;
    checkin_longitude;
    checkout_latitude;
    checkout_longitude;
    premiseId;
    routeId;
    checkinTime;
    checkoutTime;
    createdAt;
    supervisor;
    premise;
};
exports.JourneyPlan = JourneyPlan;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Route Plan ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Supervisor ID' }),
    (0, typeorm_1.Column)({ name: 'supervisor_id' }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "supervisorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Route Plan Status', enum: RoutePlanStatus }),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Check-in latitude' }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "checkin_latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Check-in longitude' }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "checkin_longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Check-out latitude' }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "checkout_latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Check-out longitude' }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "checkout_longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Premise ID' }),
    (0, typeorm_1.Column)({ name: 'premise_id' }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "premiseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Route ID' }),
    (0, typeorm_1.Column)({ name: 'route_id' }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "routeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Check-in time' }),
    (0, typeorm_1.Column)({ name: 'checkin_time', type: 'datetime' }),
    __metadata("design:type", Date)
], JourneyPlan.prototype, "checkinTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Check-out time' }),
    (0, typeorm_1.Column)({ name: 'checkout_time', type: 'datetime' }),
    __metadata("design:type", Date)
], JourneyPlan.prototype, "checkoutTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at' }),
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt', type: 'datetime' }),
    __metadata("design:type", Date)
], JourneyPlan.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff, staff => staff.journeyPlans),
    (0, typeorm_1.JoinColumn)({ name: 'supervisor_id' }),
    __metadata("design:type", staff_entity_1.Staff)
], JourneyPlan.prototype, "supervisor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => premises_entity_1.Premises),
    (0, typeorm_1.JoinColumn)({ name: 'premise_id' }),
    __metadata("design:type", premises_entity_1.Premises)
], JourneyPlan.prototype, "premise", void 0);
exports.JourneyPlan = JourneyPlan = __decorate([
    (0, typeorm_1.Entity)('route_plan')
], JourneyPlan);
//# sourceMappingURL=journey-plan.entity.js.map