import { DepartmentEntity } from "../entities/department.entity";


export class ReturnDepartmentDto {
    id: string;
    name: string;
    unit_name: string;
    created_at: Date;

    constructor(departament: DepartmentEntity) {
        this.id = departament.id;
        this.name = departament.name;
        this.unit_name = departament.unit.id;
        this.created_at = departament.created_at;
    }
}