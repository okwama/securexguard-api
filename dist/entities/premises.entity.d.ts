import { JourneyPlan } from './journey-plan.entity';
export declare class Premises {
    id: number;
    name: string;
    address: string;
    description: string;
    route_id: number;
    latitude: number;
    longitude: number;
    createdAt: Date;
    updatedAt: Date;
    journeyPlans: JourneyPlan[];
}
