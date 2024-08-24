"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketCategoryEntity = void 0;
const typeorm_1 = require("typeorm");
let TicketCategoryEntity = class TicketCategoryEntity {
};
exports.TicketCategoryEntity = TicketCategoryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TicketCategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', nullable: false }),
    __metadata("design:type", String)
], TicketCategoryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', nullable: false }),
    __metadata("design:type", String)
], TicketCategoryEntity.prototype, "description", void 0);
exports.TicketCategoryEntity = TicketCategoryEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'ticket_categories' })
], TicketCategoryEntity);
//# sourceMappingURL=ticketCategory.entity.js.map