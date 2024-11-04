import { TicketEntity } from 'src/tickets/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity('slas')
export class SlaEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'description', nullable: false})
    description: string;

    @Column({name: 'time', nullable: false})
    time: string;

    @Column({name: 'response_time', nullable: false})
    response_time: number;

    @Column({name: 'resolution_time', nullable: false})
    resolution_time: number;

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;
}