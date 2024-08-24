import { UnitEntity } from "../../units/entities/unit.entity";
import { DepartamentEntity } from "../../departaments/entities/departament.entity";
import { TicketEntity } from "../../tickets/entities/ticket.entity";
import { UserEntity } from "../../users/entities/user.entity";
import { EquipmentEntity } from "../entities/equipment.entity";
export declare class ReturnEquipmentDto {
    id: number;
    name: string;
    description: string;
    serial_number: number;
    user: UserEntity;
    unit: UnitEntity;
    department: DepartamentEntity;
    ticket: TicketEntity;
    is_shared: boolean;
    constructor(equipment: EquipmentEntity);
}
