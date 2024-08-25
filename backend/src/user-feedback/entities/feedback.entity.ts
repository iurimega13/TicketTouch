import { TicketEntity } from "src/tickets/entities/ticket.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('feedback')
export class FeedbackEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @ManyToOne(() => TicketEntity)
    @JoinColumn({name: 'ticket_id'})
    ticket: TicketEntity;

    @Column({name: 'rating', nullable: false})
    rating: number;

    @Column({name: 'comment', nullable: false})
    comment: string;

    @CreateDateColumn({name: 'created_at', nullable: false})
    created_at: Date;

}
