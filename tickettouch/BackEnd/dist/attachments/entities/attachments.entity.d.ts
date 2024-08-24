import { TicketEntity } from '../../tickets/entities/ticket.entity';
export declare class AttachmentEntity {
    id: number;
    ticket: TicketEntity;
    file_path: string;
    created_at: Date;
}
