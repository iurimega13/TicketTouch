import { UnitEntity } from '../../units/entities/unit.entity';
import { DepartamentEntity } from '../../departaments/entities/departament.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { TicketEntity } from '../../tickets/entities/ticket.entity';
export declare class EquipmentEntity {
    id: number;
    name: string;
    description: string;
    serial_number: number;
    unit: UnitEntity;
    departament: DepartamentEntity;
    user: UserEntity;
    ticket: TicketEntity;
    is_shared: boolean;
    created_at: Date;
    updated_at: Date;
}
