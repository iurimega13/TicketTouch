import { AttachmentEntity } from "../entities/attachments.entity";


export class ReturnAttachmentDto {
    id: number;
    ticket_id: number;
    file_path: string;
    created_at: Date;

    constructor(attachment: AttachmentEntity) {
        this.id = attachment.id;
        this.ticket_id = attachment.ticket.id;
        this.file_path = attachment.file_path;
        this.created_at = attachment.created_at;
    }
}