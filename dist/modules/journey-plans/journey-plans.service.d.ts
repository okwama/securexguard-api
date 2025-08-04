import { Repository } from 'typeorm';
import { JourneyPlan, RoutePlanStatus } from '../../entities/journey-plan.entity';
import { Premises } from '../../entities/premises.entity';
import { Staff } from '../../entities/staff.entity';
import { CreateJourneyPlanDto, CheckInDto, CheckOutDto } from './dto/create-journey-plan.dto';
import { PaginationDto, PaginatedResponseDto } from '../../common/dto/pagination.dto';
export declare class JourneyPlansService {
    private journeyPlanRepository;
    private premisesRepository;
    private staffRepository;
    constructor(journeyPlanRepository: Repository<JourneyPlan>, premisesRepository: Repository<Premises>, staffRepository: Repository<Staff>);
    create(createJourneyPlanDto: CreateJourneyPlanDto, supervisorId: number): Promise<JourneyPlan>;
    getStaffJourneyPlans(supervisorId: number): Promise<JourneyPlan[]>;
    getAllJourneyPlans(paginationDto: PaginationDto): Promise<PaginatedResponseDto<JourneyPlan>>;
    validateQrCode(qrCode: string, supervisorId: number): Promise<any>;
    checkIn(journeyPlanId: number, checkInDto: CheckInDto, supervisorId: number): Promise<JourneyPlan>;
    checkOut(journeyPlanId: number, checkOutDto: CheckOutDto, supervisorId: number): Promise<JourneyPlan>;
    getJourneyPlansByStatus(status: RoutePlanStatus): Promise<JourneyPlan[]>;
    getCurrentDayJourneyPlans(paginationDto: PaginationDto, supervisorId: number): Promise<{
        data: JourneyPlan[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    deleteJourneyPlan(journeyPlanId: number, supervisorId: number): Promise<{
        message: string;
    }>;
}
