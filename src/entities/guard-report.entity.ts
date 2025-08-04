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
import { Guard } from './guard.entity';
import { Premises } from './premises.entity';

export enum GuardReportType {
  PERFORMANCE = 'performance',
  INCIDENT = 'incident',
  DAILY = 'daily',
  SPECIAL = 'special',
}

export enum GuardReportStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  REVIEWED = 'reviewed',
  ARCHIVED = 'archived',
}

@Entity('guard_reports')
export class GuardReport {
  @ApiProperty({ description: 'Guard Report ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Journey Plan ID' })
  @Column({ name: 'journey_plan_id' })
  journeyPlanId: number;

  @ApiProperty({ description: 'Supervisor ID' })
  @Column({ name: 'supervisor_id' })
  supervisorId: number;

  @ApiProperty({ description: 'Guard ID' })
  @Column({ name: 'guard_id' })
  guardId: number;

  @ApiProperty({ description: 'Premise ID' })
  @Column({ name: 'premise_id' })
  premiseId: number;

  @ApiProperty({ description: 'Report Type', enum: GuardReportType })
  @Column({
    type: 'enum',
    enum: GuardReportType,
    name: 'report_type',
    default: GuardReportType.PERFORMANCE,
  })
  reportType: GuardReportType;

  @ApiProperty({ description: 'Report Status', enum: GuardReportStatus })
  @Column({
    type: 'enum',
    enum: GuardReportStatus,
    default: GuardReportStatus.DRAFT,
  })
  status: GuardReportStatus;

  // Performance Ratings (1-5 scale)
  @ApiProperty({ description: 'Appearance Rating' })
  @Column({ name: 'appearance_rating', type: 'tinyint', nullable: true })
  appearanceRating: number;

  @ApiProperty({ description: 'Conduct Rating' })
  @Column({ name: 'conduct_rating', type: 'tinyint', nullable: true })
  conductRating: number;

  @ApiProperty({ description: 'Alertness Rating' })
  @Column({ name: 'alertness_rating', type: 'tinyint', nullable: true })
  alertnessRating: number;

  @ApiProperty({ description: 'Overall Rating' })
  @Column({ name: 'overall_rating', type: 'decimal', precision: 3, scale: 2, nullable: true })
  overallRating: number;

  // Report Content
  @ApiProperty({ description: 'Report Notes' })
  @Column({ type: 'text', nullable: true })
  notes: string;

  @ApiProperty({ description: 'Commendations' })
  @Column({ type: 'text', nullable: true })
  commendations: string;

  @ApiProperty({ description: 'Concerns' })
  @Column({ type: 'text', nullable: true })
  concerns: string;

  @ApiProperty({ description: 'Recommendations' })
  @Column({ type: 'text', nullable: true })
  recommendations: string;

  // Location & Evidence
  @ApiProperty({ description: 'Latitude' })
  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @ApiProperty({ description: 'Longitude' })
  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @ApiProperty({ description: 'Photo URL' })
  @Column({ name: 'photo_url', nullable: true })
  photoUrl: string;

  @ApiProperty({ description: 'Audio URL' })
  @Column({ name: 'audio_url', nullable: true })
  audioUrl: string;

  // Metadata
  @ApiProperty({ description: 'Created At' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated At' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ description: 'Submitted At' })
  @Column({ name: 'submitted_at', nullable: true })
  submittedAt: Date;

  @ApiProperty({ description: 'Reviewed At' })
  @Column({ name: 'reviewed_at', nullable: true })
  reviewedAt: Date;

  @ApiProperty({ description: 'Reviewed By' })
  @Column({ name: 'reviewed_by', nullable: true })
  reviewedBy: number;

  // Relations
  @ManyToOne(() => JourneyPlan)
  @JoinColumn({ name: 'journey_plan_id' })
  journeyPlan: JourneyPlan;

  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'supervisor_id' })
  supervisor: Staff;

  @ManyToOne(() => Guard)
  @JoinColumn({ name: 'guard_id' })
  guard: Guard;

  @ManyToOne(() => Premises)
  @JoinColumn({ name: 'premise_id' })
  premise: Premises;
} 