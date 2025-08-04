import { JourneyPlan } from './journey-plan.entity';
import { Staff } from './staff.entity';
import { Premises } from './premises.entity';
export declare enum ReportType {
    PREMISE = "premise",
    GUARD = "guard"
}
export declare enum ReportStatus {
    DRAFT = "draft",
    SUBMITTED = "submitted",
    REVIEWED = "reviewed",
    ARCHIVED = "archived"
}
export declare class Report {
    id: number;
    routePlanId: number;
    supervisorId: number;
    premiseId: number;
    reportType: ReportType;
    relatedReportId: number;
    status: ReportStatus;
    createdAt: Date;
    updatedAt: Date;
    submittedAt: Date;
    routePlan: JourneyPlan;
    supervisor: Staff;
    premise: Premises;
}
