import { JourneyPlan } from './journey-plan.entity';
import { Staff } from './staff.entity';
import { Premises } from './premises.entity';
export declare enum PremiseReportType {
    DAILY = "daily",
    SECURITY = "security",
    MAINTENANCE = "maintenance",
    INCIDENT = "incident",
    SPECIAL = "special"
}
export declare enum PremiseReportStatus {
    DRAFT = "draft",
    SUBMITTED = "submitted",
    REVIEWED = "reviewed",
    ARCHIVED = "archived"
}
export declare class PremiseReport {
    id: number;
    journeyPlanId: number;
    supervisorId: number;
    premiseId: number;
    reportType: PremiseReportType;
    status: PremiseReportStatus;
    securityLevel: number;
    cleanlinessRating: number;
    maintenanceRating: number;
    overallRating: number;
    title: string;
    description: string;
    notes: string;
    commendations: string;
    concerns: string;
    recommendations: string;
    actionItems: string;
    latitude: number;
    longitude: number;
    photoUrl: string;
    audioUrl: string;
    createdAt: Date;
    updatedAt: Date;
    submittedAt: Date;
    reviewedAt: Date;
    reviewedBy: number;
    journeyPlan: JourneyPlan;
    supervisor: Staff;
    premise: Premises;
}
