import { DepartamentEntity } from "../entities/departament.entity";
export declare class ReturnDepartamentDto {
    id: number;
    name: string;
    unit_id: number;
    created_at: Date;
    constructor(departament: DepartamentEntity);
}
