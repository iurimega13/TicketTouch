"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ticketCategory_entity_1 = require("./entities/ticketCategory.entity");
const ticket_categories_controller_1 = require("./ticket-categories.controller");
const ticket_categories_service_1 = require("./ticket-categories.service");
let TicketCategoriesModule = class TicketCategoriesModule {
};
exports.TicketCategoriesModule = TicketCategoriesModule;
exports.TicketCategoriesModule = TicketCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ticketCategory_entity_1.TicketCategoryEntity]),
        ],
        controllers: [ticket_categories_controller_1.TicketCategoriesController],
        providers: [ticket_categories_service_1.TicketCategoriesService],
        exports: [ticket_categories_service_1.TicketCategoriesService],
    })
], TicketCategoriesModule);
//# sourceMappingURL=ticket-categories.module.js.map