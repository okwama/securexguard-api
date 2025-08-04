import { Repository } from 'typeorm';
import { Leave } from '../../entities/leave.entity';
import { CreateLeaveDto, LeaveStatus } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
export declare class LeaveService {
    private readonly leaveRepository;
    constructor(leaveRepository: Repository<Leave>);
    create(createLeaveDto: CreateLeaveDto): Promise<Leave>;
    findAll(): Promise<Leave[]>;
    findByGuard(guardId: number): Promise<Leave[]>;
    findOne(id: number): Promise<Leave>;
    update(id: number, updateLeaveDto: UpdateLeaveDto): Promise<Leave>;
    updateStatus(id: number, status: LeaveStatus): Promise<Leave>;
    remove(id: number): Promise<void>;
}
