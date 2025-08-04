import { Staff } from './staff.entity';
export declare class Sos {
    id: number;
    userId: number;
    residentId: number;
    latitude: number;
    longitude: number;
    status: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    premisesId: number;
    address: string;
    distressType: string;
    resolvedAt: Date;
    userName: string;
    userPhone: string;
    sos_status: string;
    sosNotes: string;
    user: Staff;
}
