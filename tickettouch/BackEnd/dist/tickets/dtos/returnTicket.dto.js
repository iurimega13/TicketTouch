"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnTicketDto = void 0;
class ReturnTicketDto {
    constructor(ticket) {
        this.id = ticket.id;
        this.title = ticket.title;
        this.description = ticket.description;
        this.priority = ticket.priority;
        this.status = ticket.status;
        this.category = ticket.category;
        this.user = ticket.user;
        this.technician = ticket.technician;
        this.unit = ticket.unit;
        this.sla = ticket.sla;
        this.due_date = ticket.due_date;
        this.created_at = ticket.created_at;
        this.updated_at = ticket.updated_at;
    }
}
exports.ReturnTicketDto = ReturnTicketDto;
//# sourceMappingURL=returnTicket.dto.js.map