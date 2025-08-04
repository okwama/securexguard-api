import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Country } from './country.entity';

@Entity('regions')
export class Region {
  @ApiProperty({ description: 'Region ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Region name' })
  @Column({ length: 255, unique: true })
  name: string;

  @ApiProperty({ description: 'Region created at' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty({ description: 'Region updated at' })
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ApiProperty({ description: 'Country ID' })
  @Column({ type: 'int', nullable: true })
  country_id: number;

  // Relations
  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country: Country;
} 