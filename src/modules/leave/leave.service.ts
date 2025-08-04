import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leave } from '../../entities/leave.entity';
import { CreateLeaveDto, LeaveStatus } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(Leave)
    private readonly leaveRepository: Repository<Leave>,
  ) {}

  async create(createLeaveDto: CreateLeaveDto): Promise<Leave> {
    const leave = this.leaveRepository.create({
      ...createLeaveDto,
      startDate: new Date(createLeaveDto.startDate),
      endDate: new Date(createLeaveDto.endDate),
    });
    return this.leaveRepository.save(leave);
  }

  async findAll(): Promise<Leave[]> {
    return this.leaveRepository.find({
      relations: ['guard', 'supervisor'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByGuard(guardId: number): Promise<Leave[]> {
    return this.leaveRepository.find({
      where: { guardId },
      relations: ['guard', 'supervisor'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Leave> {
    const leave = await this.leaveRepository.findOne({
      where: { id },
      relations: ['guard', 'supervisor'],
    });
    
    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }
    
    return leave;
  }

  async update(id: number, updateLeaveDto: UpdateLeaveDto): Promise<Leave> {
    const leave = await this.findOne(id);
    
    const updateData: any = { ...updateLeaveDto };
    if (updateLeaveDto.startDate) {
      updateData.startDate = new Date(updateLeaveDto.startDate);
    }
    if (updateLeaveDto.endDate) {
      updateData.endDate = new Date(updateLeaveDto.endDate);
    }
    
    Object.assign(leave, updateData);
    return this.leaveRepository.save(leave);
  }

  async updateStatus(id: number, status: LeaveStatus): Promise<Leave> {
    const leave = await this.findOne(id);
    leave.status = status;
    return this.leaveRepository.save(leave);
  }

  async remove(id: number): Promise<void> {
    const leave = await this.findOne(id);
    await this.leaveRepository.remove(leave);
  }
} 