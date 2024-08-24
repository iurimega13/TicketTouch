"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnSlaDto = void 0;
class ReturnSlaDto {
    constructor(sla) {
        this.id = sla.id;
        this.name = sla.name;
        this.description = sla.description;
        this.response_time = sla.response_time;
        this.resolution_time = sla.resolution_time;
    }
}
exports.ReturnSlaDto = ReturnSlaDto;
//# sourceMappingURL=returnSla.dto.js.map