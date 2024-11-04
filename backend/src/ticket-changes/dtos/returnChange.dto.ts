import { TicketChangeEntity } from '../entities/ticketChanges.entity';

export class ReturnChangeDto {
  id: string;
  user_id: string;
  ticket_id: string;
  changes: any[];
  created_at: Date;

  constructor(change: TicketChangeEntity) {
    this.id = change.id;
    this.user_id = change.user.id;
    this.ticket_id = change.ticket.id;
    this.changes = change.changes;
    this.created_at = change.created_at;
  }
}