import { TicketEntity } from '../../tickets/entities/ticket.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'ticket_changes' })
export class TicketChangeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TicketEntity)
  @JoinColumn({ name: 'ticket_id' })
  ticket: TicketEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'json', name: 'changes', nullable: false })
  changes: any[];

  @CreateDateColumn({ name: 'created_at', nullable: false })
  created_at: Date;
}