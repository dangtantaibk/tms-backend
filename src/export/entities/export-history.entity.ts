import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { User } from '../../users/entities/user.entity';
@Entity('export_histories')
export class ExportHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string; // 'shipment', 'trip', 'customer'...

  @Column()
  filePath: string;

  @Column({ default: false })
  isReady: boolean;

  @Column({ nullable: true })
  errorMessage?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  requestedBy?: User;
}