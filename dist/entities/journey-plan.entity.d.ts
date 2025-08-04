import { Staff } from './staff.entity';
import { Premises } from './premises.entity';
export declare enum RoutePlanStatus {
    PENDING = 0,
    IN_PROGRESS = 1,
    COMPLETED = 2,
    CANCELLED = 3
}
export declare class JourneyPlan {
    id: number;
    supervisorId: number;
    status: RoutePlanStatus;
    checkin_latitude: number;
    checkin_longitude: number;
    checkout_latitude: number;
    checkout_longitude: number;
    premiseId: number;
    routeId: number;
    checkinTime: Date;
    checkoutTime: Date;
    createdAt: Date;
    supervisor: Staff;
    premise: Premises;
}
