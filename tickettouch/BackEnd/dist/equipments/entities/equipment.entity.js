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
exports.EquipmentEntity = void 0;
const typeorm_1 = require("typeorm");
const unit_entity_1 = require("../../units/entities/unit.entity");
const departament_entity_1 = require("../../departaments/entities/departament.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
let EquipmentEntity = class EquipmentEntity {
};
exports.EquipmentEntity = EquipmentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EquipmentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', nullable: false }),
    __metadata("design:type", String)
], EquipmentEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', nullable: false }),
    __metadata("design:type", String)
], EquipmentEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'serial_number', nullable: false }),
    __metadata("design:type", Number)
], EquipmentEntity.prototype, "serial_number", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.UnitEntity),
    (0, typeorm_1.JoinColumn)({ name: 'unit_id' }),
    __metadata("design:type", unit_entity_1.UnitEntity)
], EquipmentEntity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => departament_entity_1.DepartamentEntity),
    (0, typeorm_1.JoinColumn)({ name: 'departament_id' }),
    __metadata("design:type", departament_entity_1.DepartamentEntity)
], EquipmentEntity.prototype, "departament", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], EquipmentEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticket_entity_1.TicketEntity),
    (0, typeorm_1.JoinColumn)({ name: 'ticket_id' }),
    __metadata("design:type", ticket_entity_1.TicketEntity)
], EquipmentEntity.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_shared', nullable: false }),
    __metadata("design:type", Boolean)
], EquipmentEntity.prototype, "is_shared", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', nullable: false }),
    __metadata("design:type", Date)
], EquipmentEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', nullable: false }),
    __metadata("design:type", Date)
], EquipmentEntity.prototype, "updated_at", void 0);
exports.EquipmentEntity = EquipmentEntity = __decorate([
    (0, typeorm_1.Entity)('equipments')
], EquipmentEntity);
//# sourceMappingURL=equipment.entity.js.map