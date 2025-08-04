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
exports.JourneyPlansService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const journey_plan_entity_1 = require("../../entities/journey-plan.entity");
const premises_entity_1 = require("../../entities/premises.entity");
const staff_entity_1 = require("../../entities/staff.entity");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let JourneyPlansService = class JourneyPlansService {
    journeyPlanRepository;
    premisesRepository;
    staffRepository;
    constructor(journeyPlanRepository, premisesRepository, staffRepository) {
        this.journeyPlanRepository = journeyPlanRepository;
        this.premisesRepository = premisesRepository;
        this.staffRepository = staffRepository;
    }
    async create(createJourneyPlanDto, supervisorId) {
        console.log(`🔵 CREATE JP REQUEST - Supervisor ID: ${supervisorId}`);
        console.log(`🔵 CREATE JP PAYLOAD:`, {
            premiseId: createJourneyPlanDto.premiseId,
            routeId: createJourneyPlanDto.routeId,
        });
        const premises = await this.premisesRepository.findOne({
            where: { id: createJourneyPlanDto.premiseId }
        });
        if (!premises) {
            console.log(`❌ CREATE JP ERROR - Premises not found with ID: ${createJourneyPlanDto.premiseId}`);
            throw new common_1.NotFoundException('Premises not found');
        }
        const journeyPlan = this.journeyPlanRepository.create({
            supervisorId,
            premiseId: createJourneyPlanDto.premiseId,
            routeId: createJourneyPlanDto.routeId,
            status: journey_plan_entity_1.RoutePlanStatus.PENDING,
            createdAt: new Date(),
        });
        const savedJourneyPlan = await this.journeyPlanRepository.save(journeyPlan);
        console.log(`✅ CREATE JP SUCCESS - Journey Plan created:`, {
            id: savedJourneyPlan.id,
            supervisorId: savedJourneyPlan.supervisorId,
            premiseId: savedJourneyPlan.premiseId,
            status: savedJourneyPlan.status,
            createdAt: savedJourneyPlan.createdAt,
        });
        return savedJourneyPlan;
    }
    async getStaffJourneyPlans(supervisorId) {
        return this.journeyPlanRepository.find({
            where: { supervisorId },
            relations: ['premise'],
            order: { id: 'DESC' },
        });
    }
    async getAllJourneyPlans(paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const [journeyPlans, total] = await this.journeyPlanRepository.findAndCount({
            relations: ['supervisor', 'premise'],
            order: { id: 'DESC' },
            skip,
            take: limit,
        });
        return new pagination_dto_1.PaginatedResponseDto(journeyPlans, total, page, limit);
    }
    async validateQrCode(qrCode, supervisorId) {
        const premises = await this.premisesRepository.findOne({
            where: { id: parseInt(qrCode) }
        });
        if (!premises) {
            throw new common_1.NotFoundException('Invalid QR code');
        }
        const journeyPlans = await this.journeyPlanRepository.find({
            where: {
                premiseId: premises.id,
                supervisorId,
                status: journey_plan_entity_1.RoutePlanStatus.PENDING,
            },
        });
        return {
            success: true,
            premises,
            journeyPlans,
        };
    }
    async checkIn(journeyPlanId, checkInDto, supervisorId) {
        console.log(`🔵 CHECKIN REQUEST - Journey Plan ID: ${journeyPlanId}, Supervisor ID: ${supervisorId}`);
        console.log(`🔵 CHECKIN PAYLOAD:`, {
            qrCode: checkInDto.qrCode,
            latitude: checkInDto.latitude,
            longitude: checkInDto.longitude,
        });
        const journeyPlan = await this.journeyPlanRepository.findOne({
            where: { id: journeyPlanId, supervisorId },
            relations: ['premise'],
        });
        if (!journeyPlan) {
            console.log(`❌ CHECKIN ERROR - Journey plan not found for ID ${journeyPlanId} and supervisor ${supervisorId}`);
            throw new common_1.NotFoundException('Journey plan not found');
        }
        console.log(`🔵 CHECKIN - Journey Plan Status: ${journeyPlan.status} (0=Pending, 1=InProgress, 2=Completed)`);
        if (journeyPlan.status !== journey_plan_entity_1.RoutePlanStatus.PENDING) {
            console.log(`❌ CHECKIN ERROR - Journey plan is not in pending status. Current status: ${journeyPlan.status}`);
            throw new common_1.BadRequestException('Journey plan is not in pending status');
        }
        console.log(`🔵 DEMO MODE - Skipping QR code validation`);
        console.log(`🔵 DEMO MODE - Expected QR: ${journeyPlan.premise.id}, Received QR: ${checkInDto.qrCode}`);
        journeyPlan.status = journey_plan_entity_1.RoutePlanStatus.IN_PROGRESS;
        journeyPlan.checkinTime = new Date();
        journeyPlan.checkin_latitude = checkInDto.latitude;
        journeyPlan.checkin_longitude = checkInDto.longitude;
        const savedJourneyPlan = await this.journeyPlanRepository.save(journeyPlan);
        console.log(`✅ CHECKIN SUCCESS - Journey Plan updated:`, {
            id: savedJourneyPlan.id,
            status: savedJourneyPlan.status,
            checkinTime: savedJourneyPlan.checkinTime,
            checkin_latitude: savedJourneyPlan.checkin_latitude,
            checkin_longitude: savedJourneyPlan.checkin_longitude,
        });
        return savedJourneyPlan;
    }
    async checkOut(journeyPlanId, checkOutDto, supervisorId) {
        console.log(`🔵 CHECKOUT REQUEST - Journey Plan ID: ${journeyPlanId}, Supervisor ID: ${supervisorId}`);
        console.log(`🔵 CHECKOUT PAYLOAD:`, {
            latitude: checkOutDto.latitude,
            longitude: checkOutDto.longitude,
        });
        const journeyPlan = await this.journeyPlanRepository.findOne({
            where: { id: journeyPlanId, supervisorId },
        });
        if (!journeyPlan) {
            console.log(`❌ CHECKOUT ERROR - Journey plan not found for ID ${journeyPlanId} and supervisor ${supervisorId}`);
            throw new common_1.NotFoundException('Journey plan not found');
        }
        console.log(`🔵 CHECKOUT - Journey Plan Status: ${journeyPlan.status} (0=Pending, 1=InProgress, 2=Completed)`);
        if (journeyPlan.status === journey_plan_entity_1.RoutePlanStatus.COMPLETED) {
            console.log(`✅ CHECKOUT - Journey plan already completed, returning existing data`);
            return journeyPlan;
        }
        if (journeyPlan.status !== journey_plan_entity_1.RoutePlanStatus.IN_PROGRESS) {
            console.log(`❌ CHECKOUT ERROR - Journey plan not in progress. Current status: ${journeyPlan.status}`);
            throw new common_1.BadRequestException('Journey plan is not in progress');
        }
        journeyPlan.status = journey_plan_entity_1.RoutePlanStatus.COMPLETED;
        journeyPlan.checkoutTime = new Date();
        journeyPlan.checkout_latitude = checkOutDto.latitude;
        journeyPlan.checkout_longitude = checkOutDto.longitude;
        console.log(`✅ CHECKOUT SUCCESS - Saving journey plan with data:`, {
            id: journeyPlan.id,
            status: journeyPlan.status,
            checkoutTime: journeyPlan.checkoutTime,
            checkout_latitude: journeyPlan.checkout_latitude,
            checkout_longitude: journeyPlan.checkout_longitude,
        });
        return this.journeyPlanRepository.save(journeyPlan);
    }
    async getJourneyPlansByStatus(status) {
        return this.journeyPlanRepository.find({
            where: { status },
            relations: ['supervisor', 'premise'],
            order: { id: 'DESC' },
        });
    }
    async getCurrentDayJourneyPlans(paginationDto, supervisorId) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const kenyaTime = new Date();
        kenyaTime.setHours(kenyaTime.getHours() + 3);
        const today = new Date(kenyaTime);
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const [journeyPlans, total] = await this.journeyPlanRepository.findAndCount({
            where: {
                supervisorId,
                createdAt: (0, typeorm_2.Between)(today, tomorrow),
            },
            relations: ['supervisor', 'premise'],
            order: { id: 'DESC' },
            skip,
            take: limit,
        });
        return {
            data: journeyPlans,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async deleteJourneyPlan(journeyPlanId, supervisorId) {
        console.log(`🔵 DELETE JP REQUEST - Journey Plan ID: ${journeyPlanId}, Supervisor ID: ${supervisorId}`);
        const journeyPlan = await this.journeyPlanRepository.findOne({
            where: { id: journeyPlanId, supervisorId },
        });
        if (!journeyPlan) {
            console.log(`❌ DELETE JP ERROR - Journey plan not found for ID ${journeyPlanId} and supervisor ${supervisorId}`);
            throw new common_1.NotFoundException('Journey plan not found');
        }
        console.log(`🔵 DELETE JP - Journey Plan Status: ${journeyPlan.status} (0=Pending, 1=InProgress, 2=Completed)`);
        if (journeyPlan.status !== journey_plan_entity_1.RoutePlanStatus.PENDING) {
            console.log(`❌ DELETE JP ERROR - Cannot delete journey plan that is not pending. Current status: ${journeyPlan.status}`);
            throw new common_1.BadRequestException('Cannot delete journey plan that is not pending');
        }
        await this.journeyPlanRepository.remove(journeyPlan);
        console.log(`✅ DELETE JP SUCCESS - Journey Plan ${journeyPlanId} deleted successfully`);
        return { message: 'Journey plan deleted successfully' };
    }
};
exports.JourneyPlansService = JourneyPlansService;
exports.JourneyPlansService = JourneyPlansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(journey_plan_entity_1.JourneyPlan)),
    __param(1, (0, typeorm_1.InjectRepository)(premises_entity_1.Premises)),
    __param(2, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], JourneyPlansService);
//# sourceMappingURL=journey-plans.service.js.map