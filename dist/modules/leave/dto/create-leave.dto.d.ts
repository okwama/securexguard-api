export declare enum LeaveType {
    SICK = "sick",
    UNPAID = "unpaid",
    ANNUAL = "annual",
    COMPASSIONATE = "compassionate"
}
export declare enum LeaveStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class CreateLeaveDto {
    guardId: number;
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    reason?: string;
    attachmentUrl?: string;
}
