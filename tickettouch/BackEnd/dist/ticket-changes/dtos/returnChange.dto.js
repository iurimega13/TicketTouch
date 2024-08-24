"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnChangeDto = void 0;
class ReturnChangeDto {
    constructor(change) {
        this.id = change.id;
        this.user_id = change.user.id;
        this.ticket_id = change.ticket.id;
        this.change_type = change.change_type;
        this.old_value = change.old_value;
        this.new_value = change.new_value;
        this.created_at = change.created_at;
    }
}
exports.ReturnChangeDto = ReturnChangeDto;
//# sourceMappingURL=returnChange.dto.js.map