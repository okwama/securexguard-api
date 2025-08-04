import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Staff } from './staff.entity';

@Entity('leaves')
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'guard_id' })
  guardId: number;

  @Column({ name: 'supervisor_id', nullable: true })
  supervisorId: number;

  @Column({ 
    name: 'leave_type',
    type: 'enum',
    enum: ['sick', 'unpaid', 'annual', 'compassionate'],
    default: 'annual'
  })
  leaveType: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ 
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  })
  status: string;

  @Column({ name: 'attachment_url', nullable: true })
  attachmentUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Staff, { nullable: true })
  @JoinColumn({ name: 'guard_id' })
  guard: Staff;

  @ManyToOne(() => Staff, { nullable: true })
  @JoinColumn({ name: 'supervisor_id' })
  supervisor: Staff;
} 