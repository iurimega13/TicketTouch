import { DepartmentEntity } from '../entities/department.entity';

export class ReturnDepartmentDto {
    id: string;
    name: string;
    unit_id: string; 
    created_at: Date;
    updated_at: Date;

    constructor(department: DepartmentEntity) {
        this.id = department.id;
        this.name = department.name;
        this.unit_id = department.unit.id;  
        this.created_at = department.created_at;
        this.updated_at = department.updated_at;
    }
}