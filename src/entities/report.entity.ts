import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { JourneyPlan } from './journey-plan.entity';
import { Staff } from './staff.entity';
import { Premises } from './premises.entity';

export enum ReportType {
  PREMISE = 'premise',
  GUARD = 'guard',
}

export enum ReportStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  REVIEWED = 'reviewed',
  ARCHIVED = 'archived',
}

@Entity('reports')
export class Report {
  @ApiProperty({ description: 'Report ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Route Plan ID' })
  @Column({ name: 'route_plan_id' })
  routePlanId: number;

  @ApiProperty({ description: 'Supervisor ID' })
  @Column({ name: 'supervisor_id' })
  supervisorId: number;

  @ApiProperty({ description: 'Premise ID' })
  @Column({ name: 'premise_id' })
  premiseId: number;

  @ApiProperty({ description: 'Report Type', enum: ReportType })
  @Column({
    type: 'enum',
    enum: ReportType,
    name: 'report_type',
  })
  reportType: ReportType;

  @ApiProperty({ description: 'Related Report ID' })
  @Column({ name: 'related_report_id', nullable: true })
  relatedReportId: number;

  @ApiProperty({ description: 'Report Status', enum: ReportStatus })
  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.DRAFT,
  })
  status: ReportStatus;

  @ApiProperty({ description: 'Created At' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated At' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ description: 'Submitted At' })
  @Column({ name: 'submitted_at', nullable: true })
  submittedAt: Date;

  // Relations
  @ManyToOne(() => JourneyPlan)
  @JoinColumn({ name: 'route_plan_id' })
  routePlan: JourneyPlan;

  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'supervisor_id' })
  supervisor: Staff;

  @ManyToOne(() => Premises)
  @JoinColumn({ name: 'premise_id' })
  premise: Premises;
} 