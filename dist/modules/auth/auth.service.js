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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const staff_entity_1 = require("../../entities/staff.entity");
let AuthService = class AuthService {
    staffRepository;
    jwtService;
    constructor(staffRepository, jwtService) {
        this.staffRepository = staffRepository;
        this.jwtService = jwtService;
    }
    async validateStaff(identifier, password) {
        const staff = await this.staffRepository.findOne({
            where: [
                { phone: identifier },
                { empl_no: identifier }
            ]
        });
        if (!staff) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!staff.password) {
            throw new common_1.UnauthorizedException('Account not properly configured');
        }
        const isPasswordValid = await bcrypt.compare(password, staff.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (staff.status !== staff_entity_1.StaffStatus.ACTIVE) {
            throw new common_1.UnauthorizedException('Account is deactivated');
        }
        return staff;
    }
    async login(loginDto) {
        const staff = await this.validateStaff(loginDto.identifier, loginDto.password);
        const payload = {
            staffId: staff.id,
            phone: staff.phone,
            role: staff.role_id,
            name: staff.name,
        };
        const token = this.jwtService.sign(payload);
        const { password, ...staffWithoutPassword } = staff;
        return {
            token,
            user: staffWithoutPassword,
        };
    }
    async loginSupervisor(identifier, password) {
        const staff = await this.staffRepository.findOne({
            where: [
                { phone: identifier },
                { empl_no: identifier }
            ]
        });
        if (!staff) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!staff.password) {
            throw new common_1.UnauthorizedException('Account not properly configured');
        }
        const isPasswordValid = await bcrypt.compare(password, staff.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (staff.role_id !== staff_entity_1.StaffRole.SUPERVISOR) {
            throw new common_1.BadRequestException('Access denied. This app is for supervisors only.');
        }
        if (staff.status !== staff_entity_1.StaffStatus.ACTIVE) {
            throw new common_1.UnauthorizedException('Account is deactivated');
        }
        const payload = {
            staffId: staff.id,
            phone: staff.phone,
            role: staff.role_id,
            name: staff.name,
        };
        const token = this.jwtService.sign(payload);
        const { password: _, ...staffWithoutPassword } = staff;
        return {
            token,
            user: staffWithoutPassword,
        };
    }
    async getProfile(staffId) {
        const staff = await this.staffRepository.findOne({
            where: { id: staffId },
            relations: ['premises']
        });
        if (!staff) {
            throw new common_1.UnauthorizedException('Staff not found');
        }
        const { password, ...staffWithoutPassword } = staff;
        return staffWithoutPassword;
    }
    async updateProfilePicture(staffId, imageUrl) {
        const staff = await this.staffRepository.findOne({
            where: { id: staffId }
        });
        if (!staff) {
            throw new common_1.UnauthorizedException('Staff not found');
        }
        staff.photo_url = imageUrl;
        await this.staffRepository.save(staff);
        const { password, ...staffWithoutPassword } = staff;
        return staffWithoutPassword;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map