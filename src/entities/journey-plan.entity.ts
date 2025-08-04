import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Staff } from './staff.entity';
import { Premises } from './premises.entity';

export enum RoutePlanStatus {
  PENDING = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
  CANCELLED = 3
}

@Entity('route_plan')
export class JourneyPlan {
  @ApiProperty({ description: 'Route Plan ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Supervisor ID' })
  @Column({ name: 'supervisor_id' })
  supervisorId: number;

  @ApiProperty({ description: 'Route Plan Status', enum: RoutePlanStatus })
  @Column({ type: 'int' })
  status: RoutePlanStatus;

  @ApiProperty({ description: 'Check-in latitude' })
  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  checkin_latitude: number;

  @ApiProperty({ description: 'Check-in longitude' })
  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  checkin_longitude: number;

  @ApiProperty({ description: 'Check-out latitude' })
  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  checkout_latitude: number;

  @ApiProperty({ description: 'Check-out longitude' })
  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  checkout_longitude: number;

  @ApiProperty({ description: 'Premise ID' })
  @Column({ name: 'premise_id' })
  premiseId: number;

  @ApiProperty({ description: 'Route ID' })
  @Column({ name: 'route_id' })
  routeId: number;

  @ApiProperty({ description: 'Check-in time' })
  @Column({ name: 'checkin_time', type: 'datetime' })
  checkinTime: Date;

  @ApiProperty({ description: 'Check-out time' })
  @Column({ name: 'checkout_time', type: 'datetime' })
  checkoutTime: Date;

  @ApiProperty({ description: 'Created at' })
  @CreateDateColumn({ name: 'createdAt', type: 'datetime' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => Staff, staff => staff.journeyPlans)
  @JoinColumn({ name: 'supervisor_id' })
  supervisor: Staff;

  @ManyToOne(() => Premises)
  @JoinColumn({ name: 'premise_id' })
  premise: Premises;
} 