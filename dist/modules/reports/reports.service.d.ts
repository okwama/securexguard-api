import { Repository } from 'typeorm';
import { Report } from '../../entities/report.entity';
import { GuardReport } from '../../entities/guard-report.entity';
import { PremiseReport } from '../../entities/premise-report.entity';
import { CreateGuardReportDto } from './dto/create-guard-report.dto';
import { CreatePremiseReportDto } from './dto/create-premise-report.dto';
export declare class ReportsService {
    private reportRepository;
    private guardReportRepository;
    private premiseReportRepository;
    private readonly logger;
    constructor(reportRepository: Repository<Report>, guardReportRepository: Repository<GuardReport>, premiseReportRepository: Repository<PremiseReport>);
    createGuardReport(createGuardReportDto: CreateGuardReportDto, supervisorId: number): Promise<GuardReport>;
    getGuardReportsByJourneyPlan(journeyPlanId: number): Promise<GuardReport[]>;
    getGuardReportsByPremise(premiseId: number): Promise<GuardReport[]>;
    createPremiseReport(createPremiseReportDto: CreatePremiseReportDto, supervisorId: number): Promise<PremiseReport>;
    getPremiseReportByJourneyPlan(journeyPlanId: number): Promise<PremiseReport | null>;
    getAllReportsByJourneyPlan(journeyPlanId: number): Promise<{
        guardReports: GuardReport[];
        premiseReport: PremiseReport | null;
    }>;
    getReportsBySupervisorAndDate(supervisorId: number, date: Date): Promise<Report[]>;
    getReportsByPremiseAndDate(premiseId: number, date: Date): Promise<Report[]>;
    deleteGuardReport(reportId: number, supervisorId: number): Promise<{
        message: string;
    }>;
    deletePremiseReport(reportId: number, supervisorId: number): Promise<{
        message: string;
    }>;
}
