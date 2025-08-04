import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Region } from './region.entity';

@Entity('countries')
export class Country {
  @ApiProperty({ description: 'Country ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Country name' })
  @Column({ length: 255, unique: true })
  name: string;

  @ApiProperty({ description: 'Country code' })
  @Column({ length: 10, nullable: true })
  code: string;

  @ApiProperty({ description: 'Country created at' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty({ description: 'Country updated at' })
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  // Relations
  @OneToMany(() => Region, region => region.country)
  regions: Region[];
} 