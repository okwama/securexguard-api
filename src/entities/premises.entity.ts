import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { JourneyPlan } from './journey-plan.entity';

@Entity('premises')
export class Premises {
  @ApiProperty({ description: 'Premises ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Premises name' })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({ description: 'Premises address' })
  @Column({ type: 'text' })
  address: string;

  @ApiProperty({ description: 'Premises description' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'Route ID' })
  @Column({ type: 'int' })
  route_id: number;

  @ApiProperty({ description: 'Premises latitude' })
  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @ApiProperty({ description: 'Premises longitude' })
  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @ApiProperty({ description: 'Premises created at' })
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({ description: 'Premises updated at' })
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

                // Relations
              @OneToMany(() => JourneyPlan, journeyPlan => journeyPlan.premise)
              journeyPlans: JourneyPlan[];
} 