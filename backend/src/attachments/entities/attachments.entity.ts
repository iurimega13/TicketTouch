import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TicketEntity } from '../../tickets/entities/ticket.entity';

@Entity({name: 'attachments'})
export class AttachmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TicketEntity)
    @JoinColumn({name: 'ticket_id'})
    ticket: TicketEntity;

    @Column({name: 'file_path', nullable: false})
    file_path: string;

    @CreateDateColumn({name: 'created_at', nullable: false})
    created_at: Date;

}