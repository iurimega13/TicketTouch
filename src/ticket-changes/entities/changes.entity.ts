import { TicketEntity } from 'src/tickets/entities/ticket.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity({name: 'ticket_changes'})
export class ChangeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TicketEntity)
    @JoinColumn({name: 'ticket_id'})
    ticket: TicketEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @Column({name: 'change_type', nullable: false})
    change_type: string;

    @Column({name: 'old_value', nullable: false})
    old_value: string;

    @Column({name: 'new_value', nullable: false})
    new_value: string;

    @CreateDateColumn({name: 'created_at', nullable: false})
    created_at: Date;

}