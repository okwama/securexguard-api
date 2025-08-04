import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { LeaveService } from './leave.service';
import { CreateLeaveDto, LeaveStatus } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Leave } from '../../entities/leave.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('leave')
@Controller('leave')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new leave application' })
  @ApiResponse({ status: 201, description: 'Leave application created successfully', type: Leave })
  create(@Body() createLeaveDto: CreateLeaveDto): Promise<Leave> {
    return this.leaveService.create(createLeaveDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all leave applications' })
  @ApiQuery({ name: 'guardId', required: false, description: 'Filter by guard ID' })
  @ApiResponse({ status: 200, description: 'Leave applications retrieved successfully', type: [Leave] })
  findAll(@Query('guardId') guardId?: string): Promise<Leave[]> {
    if (guardId) {
      return this.leaveService.findByGuard(+guardId);
    }
    return this.leaveService.findAll();
  }

  @Get('my-leaves')
  @ApiOperation({ summary: 'Get leave applications for the authenticated user' })
  @ApiResponse({ status: 200, description: 'Leave applications retrieved successfully', type: [Leave] })
  async getMyLeaves(@Query('guardId') guardId?: string): Promise<Leave[]> {
    // For now, we'll use the guardId from query parameter
    // In a real app, you'd get the user ID from the JWT token
    if (guardId) {
      return this.leaveService.findByGuard(+guardId);
    }
    // If no guardId provided, return all leaves (fallback)
    return this.leaveService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific leave application by ID' })
  @ApiParam({ name: 'id', description: 'Leave ID' })
  @ApiResponse({ status: 200, description: 'Leave application retrieved successfully', type: Leave })
  @ApiResponse({ status: 404, description: 'Leave application not found' })
  findOne(@Param('id') id: string): Promise<Leave> {
    return this.leaveService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a leave application' })
  @ApiParam({ name: 'id', description: 'Leave ID' })
  @ApiResponse({ status: 200, description: 'Leave application updated successfully', type: Leave })
  @ApiResponse({ status: 404, description: 'Leave application not found' })
  update(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto): Promise<Leave> {
    return this.leaveService.update(+id, updateLeaveDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update leave application status' })
  @ApiParam({ name: 'id', description: 'Leave ID' })
  @ApiResponse({ status: 200, description: 'Leave status updated successfully', type: Leave })
  @ApiResponse({ status: 404, description: 'Leave application not found' })
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: LeaveStatus }
  ): Promise<Leave> {
    return this.leaveService.updateStatus(+id, body.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a leave application' })
  @ApiParam({ name: 'id', description: 'Leave ID' })
  @ApiResponse({ status: 200, description: 'Leave application deleted successfully' })
  @ApiResponse({ status: 404, description: 'Leave application not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.leaveService.remove(+id);
  }
} 