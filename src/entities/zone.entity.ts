import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Region } from './region.entity';

@Entity('zones')
export class Zone {
  @ApiProperty({ description: 'Zone ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Zone name' })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({ description: 'Region ID' })
  @Column({ type: 'int' })
  region_id: number;

  @ApiProperty({ description: 'Zone created at' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty({ description: 'Zone updated at' })
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  // Relations
  @ManyToOne(() => Region)
  @JoinColumn({ name: 'region_id' })
  region: Region;
} 