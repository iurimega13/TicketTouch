import { UserEntity } from "../entities/user.entity";
import { UnitEntity } from "../../units/entities/unit.entity";
import { DepartamentEntity } from "../../departaments/entities/departament.entity";
export declare class ReturnUserDto {
    id: string;
    registration: number;
    name: string;
    email: string;
    role: string;
    phone_number: string;
    unit: UnitEntity;
    department: DepartamentEntity;
    created_at: Date;
    constructor(user: UserEntity);
}
