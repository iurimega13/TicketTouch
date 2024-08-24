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
exports.AttachmentEntity = void 0;
const typeorm_1 = require("typeorm");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
let AttachmentEntity = class AttachmentEntity {
};
exports.AttachmentEntity = AttachmentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AttachmentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticket_entity_1.TicketEntity),
    (0, typeorm_1.JoinColumn)({ name: 'ticket_id' }),
    __metadata("design:type", ticket_entity_1.TicketEntity)
], AttachmentEntity.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_path', nullable: false }),
    __metadata("design:type", String)
], AttachmentEntity.prototype, "file_path", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', nullable: false }),
    __metadata("design:type", Date)
], AttachmentEntity.prototype, "created_at", void 0);
exports.AttachmentEntity = AttachmentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'attachments' })
], AttachmentEntity);
//# sourceMappingURL=attachments.entity.js.map