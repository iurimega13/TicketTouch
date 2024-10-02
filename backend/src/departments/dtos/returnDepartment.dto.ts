import { DepartmentEntity } from '../entities/department.entity';

export class ReturnDepartmentDto {
    id: string;
    name: string;
    unit_id: string;  // Adiciona o ID da unidade
    created_at: Date;
    updated_at: Date;

    constructor(department: DepartmentEntity) {
        this.id = department.id;
        this.name = department.name;
        this.unit_id = department.unit.id;  // Acessa o ID da unidade
        this.created_at = department.created_at;
        this.updated_at = department.updated_at;
    }
}