import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Premises } from './premises.entity';

@Entity('guards')
export class Guard {
  @ApiProperty({ description: 'Guard ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Guard name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Guard photo URL' })
  @Column({ name: 'photo_url' })
  photoUrl: string;

  @ApiProperty({ description: 'Employee number' })
  @Column({ name: 'empl_no' })
  emplNo: string;

  @ApiProperty({ description: 'ID number' })
  @Column({ name: 'id_no' })
  idNo: string;

  @ApiProperty({ description: 'Phone number' })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ description: 'Email address' })
  @Column({ nullable: true })
  email: string;



  @ApiProperty({ description: 'Premise ID' })
  @Column({ name: 'premise_id', nullable: true })
  premiseId: number | null;

  @ApiProperty({ description: 'Guard status' })
  @Column({ default: 1 })
  status: number;

  @ApiProperty({ description: 'Created at' })
  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at' })
  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Premises)
  @JoinColumn({ name: 'premise_id' })
  premise: Premises;

//   @ManyToOne(() => Zones)
//   @JoinColumn({ name: 'zone_id' })
//   zone: Zones;
} 