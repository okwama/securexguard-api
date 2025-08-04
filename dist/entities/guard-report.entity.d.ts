import { JourneyPlan } from './journey-plan.entity';
import { Staff } from './staff.entity';
import { Guard } from './guard.entity';
import { Premises } from './premises.entity';
export declare enum GuardReportType {
    PERFORMANCE = "performance",
    INCIDENT = "incident",
    DAILY = "daily",
    SPECIAL = "special"
}
export declare enum GuardReportStatus {
    DRAFT = "draft",
    SUBMITTED = "submitted",
    REVIEWED = "reviewed",
    ARCHIVED = "archived"
}
export declare class GuardReport {
    id: number;
    journeyPlanId: number;
    supervisorId: number;
    guardId: number;
    premiseId: number;
    reportType: GuardReportType;
    status: GuardReportStatus;
    appearanceRating: number;
    conductRating: number;
    alertnessRating: number;
    overallRating: number;
    notes: string;
    commendations: string;
    concerns: string;
    recommendations: string;
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
    guard: Guard;
    premise: Premises;
}
