import { UserEntity } from "../entities/user.entity";
import { UnitEntity } from "../../units/entities/unit.entity";
import { DepartamentEntity } from "../../departaments/entities/departament.entity";

export class ReturnUserDto {
    id: string;
    registration: number;
    name: string;
    email: string;
    role: string;
    phone_number: string;
    unit: UnitEntity;
    department: DepartamentEntity;
    created_at: Date;

    constructor(user: UserEntity) {
        this.id = user.id;
        this.registration = user.registration;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.phone_number = user.phone_number;
        this.unit = user.unit;
        this.department = user.department;
        this.created_at = user.created_at;
    }
}