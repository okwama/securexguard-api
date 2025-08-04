import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Premises } from './premises.entity';
import { Sos } from './sos.entity';
import { JourneyPlan } from './journey-plan.entity';

export enum StaffRole {
  SUPERVISOR = 1,
  GUARD = 2
}

export enum StaffStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  SUSPENDED = 2,
  TERMINATED = 3
}

@Entity('staff')
export class Staff {
  @ApiProperty({ description: 'Staff ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Staff name' })
  @Column({ length: 200 })
  name: string;

  @ApiProperty({ description: 'Phone number' })
  @Column({ length: 20, nullable: true })
  phone: string;

  @ApiProperty({ description: 'Hashed password' })
  @Column({ length: 255, nullable: true })
  password: string;

  @ApiProperty({ description: 'Role ID', enum: StaffRole })
  @Column({ type: 'int', nullable: true })
  role_id: StaffRole;

  @ApiProperty({ description: 'Role name' })
  @Column({ length: 200, nullable: true })
  role: string;

  @ApiProperty({ description: 'Employee number' })
  @Column({ length: 100 })
  empl_no: string;

  @ApiProperty({ description: 'ID number' })
  @Column({ type: 'int' })
  id_no: number;

  @ApiProperty({ description: 'Photo URL' })
  @Column({ length: 200 })
  photo_url: string;

  @ApiProperty({ description: 'Staff status', enum: StaffStatus })
  @Column({ type: 'int', default: StaffStatus.INACTIVE })
  status: StaffStatus;

  @ApiProperty({ description: 'Created at' })
  @Column({ type: 'datetime', precision: 3, nullable: true })
  created_at: Date;

  @ApiProperty({ description: 'Premises ID' })
  @Column({ type: 'int', nullable: true })
  premisesId: number;

  @ApiProperty({ description: 'Route ID' })
  @Column({ type: 'int', nullable: true })
  routeId: number;

  @ApiProperty({ description: 'Zone ID' })
  @Column({ type: 'int', default: 0 })
  zone_id: number;

                // Relations
              @OneToMany(() => JourneyPlan, journeyPlan => journeyPlan.supervisor)
              journeyPlans: JourneyPlan[];

              @OneToMany(() => Sos, sos => sos.user)
              sosAlerts: Sos[];

              @ManyToOne(() => Premises)
              @JoinColumn({ name: 'premisesId' })
              premises: Premises;
} 