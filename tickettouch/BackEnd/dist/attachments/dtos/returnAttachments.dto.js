"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnAttachmentDto = void 0;
class ReturnAttachmentDto {
    constructor(attachment) {
        this.id = attachment.id;
        this.ticket_id = attachment.ticket.id;
        this.file_path = attachment.file_path;
        this.created_at = attachment.created_at;
    }
}
exports.ReturnAttachmentDto = ReturnAttachmentDto;
//# sourceMappingURL=returnAttachments.dto.js.map