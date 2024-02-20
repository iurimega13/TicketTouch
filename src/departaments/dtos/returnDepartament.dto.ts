import { DepartamentEntity } from "../entities/departament.entity";


export class ReturnDepartamentDto {
    id: number;
    name: string;
    unit_id: number;
    created_at: Date;

    constructor(departament: DepartamentEntity) {
        this.id = departament.id;
        this.name = departament.name;
        this.unit_id = departament.unit.id;
        this.created_at = departament.created_at;
    }
}