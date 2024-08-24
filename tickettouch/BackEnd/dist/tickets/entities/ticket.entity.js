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
exports.TicketEntity = void 0;
const sla_entity_1 = require("../../slas/entities/sla.entity");
const ticketCategory_entity_1 = require("../../ticket-categories/entities/ticketCategory.entity");
const unit_entity_1 = require("../../units/entities/unit.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let TicketEntity = class TicketEntity {
};
exports.TicketEntity = TicketEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TicketEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title', nullable: false }),
    __metadata("design:type", String)
], TicketEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', nullable: false }),
    __metadata("design:type", String)
], TicketEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'priority', nullable: false }),
    __metadata("design:type", String)
], TicketEntity.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', nullable: false }),
    __metadata("design:type", String)
], TicketEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticketCategory_entity_1.TicketCategoryEntity),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", ticketCategory_entity_1.TicketCategoryEntity)
], TicketEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], TicketEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'technician_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], TicketEntity.prototype, "technician", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.UnitEntity),
    (0, typeorm_1.JoinColumn)({ name: 'unit_id' }),
    __metadata("design:type", unit_entity_1.UnitEntity)
], TicketEntity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sla_entity_1.SlaEntity),
    (0, typeorm_1.JoinColumn)({ name: 'sla_id' }),
    __metadata("design:type", sla_entity_1.SlaEntity)
], TicketEntity.prototype, "sla", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'due_date', nullable: false }),
    __metadata("design:type", Date)
], TicketEntity.prototype, "due_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', nullable: false }),
    __metadata("design:type", Date)
], TicketEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', nullable: false }),
    __metadata("design:type", Date)
], TicketEntity.prototype, "updated_at", void 0);
exports.TicketEntity = TicketEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'tickets' })
], TicketEntity);
//# sourceMappingURL=ticket.entity.js.map