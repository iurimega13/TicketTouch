"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnEquipmentDto = void 0;
class ReturnEquipmentDto {
    constructor(equipment) {
        this.id = equipment.id;
        this.name = equipment.name;
        this.description = equipment.description;
        this.serial_number = equipment.serial_number;
        this.user = equipment.user;
        this.unit = equipment.unit;
        this.department = equipment.departament;
        this.ticket = equipment.ticket;
        this.is_shared = equipment.is_shared;
    }
}
exports.ReturnEquipmentDto = ReturnEquipmentDto;
//# sourceMappingURL=returnEquipment.dto.js.map