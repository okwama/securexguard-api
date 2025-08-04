import { ReportsService } from './reports.service';
import { CreateGuardReportDto } from './dto/create-guard-report.dto';
import { CreatePremiseReportDto } from './dto/create-premise-report.dto';
import { GuardReport } from '../../entities/guard-report.entity';
import { PremiseReport } from '../../entities/premise-report.entity';
import { Report } from '../../entities/report.entity';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    createGuardReport(createGuardReportDto: CreateGuardReportDto, req: any): Promise<GuardReport>;
    getGuardReportsByJourneyPlan(journeyPlanId: number): Promise<GuardReport[]>;
    getGuardReportsByPremise(premiseId: number): Promise<GuardReport[]>;
    deleteGuardReport(id: number, req: any): Promise<{
        message: string;
    }>;
    createPremiseReport(createPremiseReportDto: CreatePremiseReportDto, req: any): Promise<PremiseReport>;
    getPremiseReportByJourneyPlan(journeyPlanId: number): Promise<PremiseReport | null>;
    deletePremiseReport(id: number, req: any): Promise<{
        message: string;
    }>;
    getAllReportsByJourneyPlan(journeyPlanId: number): Promise<{
        guardReports: GuardReport[];
        premiseReport: PremiseReport | null;
    }>;
    getReportsBySupervisorAndDate(dateString: string, req: any): Promise<Report[]>;
    getReportsByPremiseAndDate(premiseId: number, dateString: string): Promise<Report[]>;
}
