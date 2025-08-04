import { PremiseReportType } from '../../../entities/premise-report.entity';
export declare class CreatePremiseReportDto {
    journeyPlanId: number;
    premiseId: number;
    reportType?: PremiseReportType;
    securityLevel?: number;
    cleanlinessRating?: number;
    maintenanceRating?: number;
    title?: string;
    description?: string;
    notes?: string;
    commendations?: string;
    concerns?: string;
    recommendations?: string;
    actionItems?: string;
    latitude?: number;
    longitude?: number;
    photoUrl?: string;
}
