import { GuardReportType } from '../../../entities/guard-report.entity';
export declare class CreateGuardReportDto {
    journeyPlanId: number;
    guardId: number;
    premiseId: number;
    reportType?: GuardReportType;
    appearanceRating?: number;
    conductRating?: number;
    alertnessRating?: number;
    notes?: string;
    commendations?: string;
    concerns?: string;
    recommendations?: string;
    latitude?: number;
    longitude?: number;
    photoUrl?: string;
}
