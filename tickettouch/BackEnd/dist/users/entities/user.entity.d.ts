import { UnitEntity } from "../../units/entities/unit.entity";
import { DepartamentEntity } from "../../departaments/entities/departament.entity";
export declare class UserEntity {
    id: string;
    registration: number;
    name: string;
    email: string;
    password: string;
    role: string;
    phone_number: string;
    unit_id: number;
    unit: UnitEntity;
    department_id: number;
    department: DepartamentEntity;
    created_at: Date;
}
