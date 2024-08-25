import { IsString, IsNumber, IsBoolean } from "class-validator";
import { DepartmentEntity } from "../../departments/entities/department.entity";
import { TicketEntity } from "../../tickets/entities/ticket.entity";
import { UnitEntity } from "../../units/entities/unit.entity";
import { UserEntity } from "../../users/entities/user.entity";
import { JoinColumn, ManyToOne } from "typeorm";



export class CreateEquipmentDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    serial_number: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user_id: number;

    @ManyToOne(() => UnitEntity)
    @JoinColumn({ name: 'unit_id' })
    unit_id: number;

    @ManyToOne(() => DepartmentEntity)
    @JoinColumn({ name: 'departament_id' })
    departament_id: number;

    @ManyToOne(() => TicketEntity)
    @JoinColumn({ name: 'ticket_id' })
    ticket_id: number;

    @IsBoolean()
    is_shared: boolean;

}