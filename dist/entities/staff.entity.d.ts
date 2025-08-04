import { Premises } from './premises.entity';
import { Sos } from './sos.entity';
import { JourneyPlan } from './journey-plan.entity';
export declare enum StaffRole {
    SUPERVISOR = 1,
    GUARD = 2
}
export declare enum StaffStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    SUSPENDED = 2,
    TERMINATED = 3
}
export declare class Staff {
    id: number;
    name: string;
    phone: string;
    password: string;
    role_id: StaffRole;
    role: string;
    empl_no: string;
    id_no: number;
    photo_url: string;
    status: StaffStatus;
    created_at: Date;
    premisesId: number;
    routeId: number;
    zone_id: number;
    journeyPlans: JourneyPlan[];
    sosAlerts: Sos[];
    premises: Premises;
}
