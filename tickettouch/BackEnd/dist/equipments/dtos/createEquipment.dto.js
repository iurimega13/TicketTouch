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
exports.CreateEquipmentDto = void 0;
const class_validator_1 = require("class-validator");
const departament_entity_1 = require("../../departaments/entities/departament.entity");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
const unit_entity_1 = require("../../units/entities/unit.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
class CreateEquipmentDto {
}
exports.CreateEquipmentDto = CreateEquipmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEquipmentDto.prototype, "serial_number", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], CreateEquipmentDto.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.UnitEntity),
    (0, typeorm_1.JoinColumn)({ name: 'unit_id' }),
    __metadata("design:type", Number)
], CreateEquipmentDto.prototype, "unit_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => departament_entity_1.DepartamentEntity),
    (0, typeorm_1.JoinColumn)({ name: 'departament_id' }),
    __metadata("design:type", Number)
], CreateEquipmentDto.prototype, "departament_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticket_entity_1.TicketEntity),
    (0, typeorm_1.JoinColumn)({ name: 'ticket_id' }),
    __metadata("design:type", Number)
], CreateEquipmentDto.prototype, "ticket_id", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateEquipmentDto.prototype, "is_shared", void 0);
//# sourceMappingURL=createEquipment.dto.js.map