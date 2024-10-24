import { UnitEntity } from "../../units/entities/unit.entity";
import { DepartmentEntity } from "../../departments/entities/department.entity";
import { TicketEntity } from "../../tickets/entities/ticket.entity";
import { UserEntity } from "../../users/entities/user.entity";
import { EquipmentEntity } from "../entities/equipment.entity";

export class ReturnEquipmentDto {
    id: string;
    name: string;
    description: string;
    serial_number: string;
    user_id: UserEntity;
    unit_id: UnitEntity;
    department_id: DepartmentEntity;
    ticket: TicketEntity;
    is_shared: boolean;

    constructor(equipment: EquipmentEntity) {
        this.id = equipment.id;
        this.name = equipment.name;
        this.description = equipment.description;
        this.serial_number = equipment.serial_number;
        this.user_id = equipment.user;
        this.unit_id = equipment.unit;
        this.department_id = equipment.department;
        this.is_shared = equipment.is_shared;
    }
}