import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Staff } from './staff.entity';

@Entity('sos')
export class Sos {
  @ApiProperty({ description: 'SOS ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User ID' })
  @Column({ nullable: true })
  userId: number;

  @ApiProperty({ description: 'Resident ID' })
  @Column({ nullable: true })
  residentId: number;

  @ApiProperty({ description: 'Latitude' })
  @Column({ type: 'double', nullable: true })
  latitude: number;

  @ApiProperty({ description: 'Longitude' })
  @Column({ type: 'double', nullable: true })
  longitude: number;

  @ApiProperty({ description: 'Status' })
  @Column({ length: 191, default: 'active' })
  status: string;

  @ApiProperty({ description: 'Notes' })
  @Column({ length: 191, nullable: true })
  notes: string;

  @ApiProperty({ description: 'Created at' })
  @CreateDateColumn({ type: 'datetime', precision: 3 })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at' })
  @UpdateDateColumn({ type: 'datetime', precision: 3 })
  updatedAt: Date;

  @ApiProperty({ description: 'Premises ID' })
  @Column({ nullable: true })
  premisesId: number;

  @ApiProperty({ description: 'Address' })
  @Column({ length: 191, nullable: true })
  address: string;

  @ApiProperty({ description: 'Distress type' })
  @Column({ length: 191, nullable: true })
  distressType: string;

  @ApiProperty({ description: 'Resolved at' })
  @Column({ type: 'datetime', precision: 3, nullable: true })
  resolvedAt: Date;

  @ApiProperty({ description: 'User name' })
  @Column({ length: 191, nullable: true })
  userName: string;

  @ApiProperty({ description: 'User phone' })
  @Column({ length: 191, nullable: true })
  userPhone: string;

  @ApiProperty({ description: 'SOS status' })
  @Column({ length: 191, default: '0' })
  sos_status: string;

  @ApiProperty({ description: 'SOS notes' })
  @Column({ type: 'text' })
  sosNotes: string;

  // Relations
  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'userId' })
  user: Staff;
} 