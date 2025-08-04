import { Staff } from './staff.entity';
export declare class Leave {
    id: number;
    guardId: number;
    supervisorId: number;
    leaveType: string;
    startDate: Date;
    endDate: Date;
    reason: string;
    status: string;
    attachmentUrl: string;
    createdAt: Date;
    updatedAt: Date;
    guard: Staff;
    supervisor: Staff;
}
