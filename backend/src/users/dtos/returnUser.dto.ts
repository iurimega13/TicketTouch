import { UserEntity } from "../entities/user.entity";
import { UnitEntity } from "../../units/entities/unit.entity";
import { DepartmentEntity } from "../../departments/entities/department.entity";

export class ReturnUserDto {
    id: string;
    username: string;
    name: string;
    email: string;
    role: string;
    phone_number: string;
    unit: UnitEntity;
    department: DepartmentEntity;
    created_at: Date;

    constructor(user: UserEntity) {
        this.id = user.id;
        this.username = user.username;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.phone_number = user.phone_number;
        this.unit = user.unit;
        this.department = user.department;
        this.created_at = user.created_at;
    }
}