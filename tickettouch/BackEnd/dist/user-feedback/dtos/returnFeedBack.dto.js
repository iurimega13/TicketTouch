"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnFeedbackDto = void 0;
class ReturnFeedbackDto {
    constructor(feedback) {
        this.id = feedback.id;
        this.user = feedback.user;
        this.ticket = feedback.ticket;
        this.rating = feedback.rating;
        this.comment = feedback.comment;
        this.created_at = feedback.created_at;
    }
}
exports.ReturnFeedbackDto = ReturnFeedbackDto;
//# sourceMappingURL=returnFeedBack.dto.js.map