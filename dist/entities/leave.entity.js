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
exports.Leave = void 0;
const typeorm_1 = require("typeorm");
const staff_entity_1 = require("./staff.entity");
let Leave = class Leave {
    id;
    guardId;
    supervisorId;
    leaveType;
    startDate;
    endDate;
    reason;
    status;
    attachmentUrl;
    createdAt;
    updatedAt;
    guard;
    supervisor;
};
exports.Leave = Leave;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Leave.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'guard_id' }),
    __metadata("design:type", Number)
], Leave.prototype, "guardId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supervisor_id', nullable: true }),
    __metadata("design:type", Number)
], Leave.prototype, "supervisorId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'leave_type',
        type: 'enum',
        enum: ['sick', 'unpaid', 'annual', 'compassionate'],
        default: 'annual'
    }),
    __metadata("design:type", String)
], Leave.prototype, "leaveType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date' }),
    __metadata("design:type", Date)
], Leave.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date' }),
    __metadata("design:type", Date)
], Leave.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Leave.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }),
    __metadata("design:type", String)
], Leave.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'attachment_url', nullable: true }),
    __metadata("design:type", String)
], Leave.prototype, "attachmentUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Leave.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Leave.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'guard_id' }),
    __metadata("design:type", staff_entity_1.Staff)
], Leave.prototype, "guard", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'supervisor_id' }),
    __metadata("design:type", staff_entity_1.Staff)
], Leave.prototype, "supervisor", void 0);
exports.Leave = Leave = __decorate([
    (0, typeorm_1.Entity)('leaves')
], Leave);
//# sourceMappingURL=leave.entity.js.map