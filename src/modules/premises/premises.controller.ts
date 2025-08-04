import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { PremisesService } from './premises.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Premises } from '../../entities/premises.entity';

@ApiTags('premises')
@Controller('premises')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PremisesController {
  constructor(private readonly premisesService: PremisesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all premises' })
  @ApiResponse({ status: 200, description: 'Premises retrieved successfully', type: [Premises] })
  async getAllPremises(): Promise<Premises[]> {
    return this.premisesService.getAllPremises();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get premises by ID' })
  @ApiParam({ name: 'id', description: 'Premises ID' })
  @ApiResponse({ status: 200, description: 'Premises retrieved successfully', type: Premises })
  async getPremisesById(@Param('id') id: number): Promise<Premises> {
    return this.premisesService.getPremisesById(id);
  }
} 