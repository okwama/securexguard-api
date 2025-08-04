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

export enum PremiseReportType {
  DAILY = 'daily',
  SECURITY = 'security',
  MAINTENANCE = 'maintenance',
  INCIDENT = 'incident',
  SPECIAL = 'special',
}

export enum PremiseReportStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  REVIEWED = 'reviewed',
  ARCHIVED = 'archived',
}

@Entity('premise_reports')
export class PremiseReport {
  @ApiProperty({ description: 'Premise Report ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Journey Plan ID' })
  @Column({ name: 'journey_plan_id' })
  journeyPlanId: number;

  @ApiProperty({ description: 'Supervisor ID' })
  @Column({ name: 'supervisor_id' })
  supervisorId: number;

  @ApiProperty({ description: 'Premise ID' })
  @Column({ name: 'premise_id' })
  premiseId: number;

  @ApiProperty({ description: 'Report Type', enum: PremiseReportType })
  @Column({
    type: 'enum',
    enum: PremiseReportType,
    name: 'report_type',
    default: PremiseReportType.DAILY,
  })
  reportType: PremiseReportType;

  @ApiProperty({ description: 'Report Status', enum: PremiseReportStatus })
  @Column({
    type: 'enum',
    enum: PremiseReportStatus,
    default: PremiseReportStatus.DRAFT,
  })
  status: PremiseReportStatus;

  // Premise Assessment Ratings (1-5 scale)
  @ApiProperty({ description: 'Security Level Rating' })
  @Column({ name: 'security_level', type: 'tinyint', nullable: true })
  securityLevel: number;

  @ApiProperty({ description: 'Cleanliness Rating' })
  @Column({ name: 'cleanliness_rating', type: 'tinyint', nullable: true })
  cleanlinessRating: number;

  @ApiProperty({ description: 'Maintenance Rating' })
  @Column({ name: 'maintenance_rating', type: 'tinyint', nullable: true })
  maintenanceRating: number;

  @ApiProperty({ description: 'Overall Rating' })
  @Column({ name: 'overall_rating', type: 'decimal', precision: 3, scale: 2, nullable: true })
  overallRating: number;

  // Report Content
  @ApiProperty({ description: 'Report Title' })
  @Column({ nullable: true })
  title: string;

  @ApiProperty({ description: 'Report Description' })
  @Column({ type: 'text', nullable: true })
  description: string;

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

  @ApiProperty({ description: 'Action Items' })
  @Column({ name: 'action_items', type: 'text', nullable: true })
  actionItems: string;

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

  @ManyToOne(() => Premises)
  @JoinColumn({ name: 'premise_id' })
  premise: Premises;
} 