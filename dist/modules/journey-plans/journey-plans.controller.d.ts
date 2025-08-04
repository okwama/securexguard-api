import { JourneyPlansService } from './journey-plans.service';
import { CreateJourneyPlanDto, CheckInDto, CheckOutDto } from './dto/create-journey-plan.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JourneyPlan, RoutePlanStatus } from '../../entities/journey-plan.entity';
export declare class JourneyPlansController {
    private readonly journeyPlansService;
    constructor(journeyPlansService: JourneyPlansService);
    create(createJourneyPlanDto: CreateJourneyPlanDto, user: any): Promise<JourneyPlan>;
    getStaffJourneyPlans(user: any): Promise<JourneyPlan[]>;
    getAllJourneyPlans(paginationDto: PaginationDto): Promise<import("../../common/dto/pagination.dto").PaginatedResponseDto<JourneyPlan>>;
    validateQrCode(body: {
        qrCode: string;
    }, user: any): Promise<any>;
    checkIn(id: number, checkInDto: CheckInDto, user: any): Promise<JourneyPlan>;
    checkOut(id: number, checkOutDto: CheckOutDto, user: any): Promise<JourneyPlan>;
    getJourneyPlansByStatus(status: RoutePlanStatus): Promise<JourneyPlan[]>;
    getCurrentDayJourneyPlans(paginationDto: PaginationDto, user: any): Promise<{
        data: JourneyPlan[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    deleteJourneyPlan(id: number, user: any): Promise<{
        message: string;
    }>;
}
