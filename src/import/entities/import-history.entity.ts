import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { User } from '../../users/entities/user.entity';
@Entity('import_histories')
export class ImportHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string; // 'shipment', 'trip'...

  @Column()
  fileName: string;

  @Column({ default: 'processing' })
  status: 'processing' | 'success' | 'failed';

  @Column({ nullable: true })
  errorMessage?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  uploadedBy?: User;
}