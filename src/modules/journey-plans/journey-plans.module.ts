import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JourneyPlansController } from './journey-plans.controller';
import { JourneyPlansService } from './journey-plans.service';
import { JourneyPlan } from '../../entities/journey-plan.entity';
import { Premises } from '../../entities/premises.entity';
import { Staff } from '../../entities/staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JourneyPlan, Premises, Staff])],
  controllers: [JourneyPlansController],
  providers: [JourneyPlansService],
  exports: [JourneyPlansService],
})
export class JourneyPlansModule {} 