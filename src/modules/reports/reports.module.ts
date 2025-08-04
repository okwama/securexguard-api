import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from '../../entities/report.entity';
import { GuardReport } from '../../entities/guard-report.entity';
import { PremiseReport } from '../../entities/premise-report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report, GuardReport, PremiseReport]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {} 