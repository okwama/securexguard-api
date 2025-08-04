import { LeaveService } from './leave.service';
import { CreateLeaveDto, LeaveStatus } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Leave } from '../../entities/leave.entity';
export declare class LeaveController {
    private readonly leaveService;
    constructor(leaveService: LeaveService);
    create(createLeaveDto: CreateLeaveDto): Promise<Leave>;
    findAll(guardId?: string): Promise<Leave[]>;
    getMyLeaves(guardId?: string): Promise<Leave[]>;
    findOne(id: string): Promise<Leave>;
    update(id: string, updateLeaveDto: UpdateLeaveDto): Promise<Leave>;
    updateStatus(id: string, body: {
        status: LeaveStatus;
    }): Promise<Leave>;
    remove(id: string): Promise<void>;
}
