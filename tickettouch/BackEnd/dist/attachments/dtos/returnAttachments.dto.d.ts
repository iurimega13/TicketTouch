import { AttachmentEntity } from "../entities/attachments.entity";
export declare class ReturnAttachmentDto {
    id: number;
    ticket_id: number;
    file_path: string;
    created_at: Date;
    constructor(attachment: AttachmentEntity);
}
