import { UnitEntity } from "src/units/entities/unit.entity";
import { DepartamentEntity } from "src/departaments/entities/departament.entity";
import { TicketEntity } from "src/tickets/entities/ticket.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { EquipmentEntity } from "../entities/equipment.entity";

export class ReturnEquipmentDto {
    id: number;
    name: string;
    description: string;
    serial_number: number;
    user: UserEntity;
    unit: UnitEntity;
    department: DepartamentEntity;
    ticket: TicketEntity;
    is_shared: boolean;

    constructor(equipment: EquipmentEntity) {
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