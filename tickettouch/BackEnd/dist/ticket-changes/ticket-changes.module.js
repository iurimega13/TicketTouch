"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketChangesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ticket_changes_controller_1 = require("./ticket-changes.controller");
const ticket_changes_service_1 = require("./ticket-changes.service");
const ticketChanges_entity_1 = require("./entities/ticketChanges.entity");
let TicketChangesModule = class TicketChangesModule {
};
exports.TicketChangesModule = TicketChangesModule;
exports.TicketChangesModule = TicketChangesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ticketChanges_entity_1.TicketChangeEntity]),
        ],
        controllers: [ticket_changes_controller_1.TicketChangesController],
        providers: [ticket_changes_service_1.TicketChangesService],
        exports: [ticket_changes_service_1.TicketChangesService],
    })
], TicketChangesModule);
//# sourceMappingURL=ticket-changes.module.js.map