import { UnitEntity } from "../../units/entities/unit.entity";
import { DepartmentEntity } from "../../departments/entities/department.entity";
import { TicketEntity } from "../../tickets/entities/ticket.entity";
import { UserEntity } from "../../users/entities/user.entity";
import { EquipmentEntity } from "../entities/equipment.entity";

export class ReturnEquipmentDto {
    id: number;
    name: string;
    description: string;
    serial_number: number;
    user: UserEntity;
    unit: UnitEntity;
    department: DepartmentEntity;
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