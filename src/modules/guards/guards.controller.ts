import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { GuardsService } from './guards.service';
import { Guard } from '../../entities/guard.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('guards')
@Controller('guards')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GuardsController {
  constructor(private readonly guardsService: GuardsService) {}

  @Get('test')
  @ApiOperation({ summary: 'Test endpoint to verify guards module is working' })
  @ApiResponse({ status: 200, description: 'Guards module is working' })
  async testGuardsModule(): Promise<{ message: string; timestamp: string }> {
    console.log('🔵 GUARDS MODULE TEST - Endpoint called successfully');
    return {
      message: 'Guards module is working!',
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all active guards' })
  @ApiResponse({ status: 200, description: 'All guards retrieved successfully', type: [Guard] })
  async getAllGuards(): Promise<Guard[]> {
    return this.guardsService.getAllGuards();
  }

  @Get('premises/:premiseId')
  @ApiOperation({ summary: 'Get guards assigned to a specific premise' })
  @ApiParam({ name: 'premiseId', description: 'Premise ID' })
  @ApiResponse({ status: 200, description: 'Guards retrieved successfully', type: [Guard] })
  @ApiResponse({ status: 404, description: 'Premise not found' })
  async getGuardsByPremise(@Param('premiseId') premiseId: number): Promise<Guard[]> {
    return this.guardsService.getGuardsByPremise(premiseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific guard by ID' })
  @ApiParam({ name: 'id', description: 'Guard ID' })
  @ApiResponse({ status: 200, description: 'Guard retrieved successfully', type: Guard })
  @ApiResponse({ status: 404, description: 'Guard not found' })
  async getGuardById(@Param('id') id: number): Promise<Guard> {
    return this.guardsService.getGuardById(id);
  }
} 