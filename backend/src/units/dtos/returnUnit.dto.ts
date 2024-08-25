import { UnitEntity } from "../entities/unit.entity";


export class ReturnUnitDto {
    id: string;
    name: string;
    address: string;
    created_at: Date;
    updated_at: Date;

    constructor(unit: UnitEntity){
        this.id = unit.id;
        this.name = unit.name;
        this.address = unit.address;
        this.created_at = unit.created_at;
        this.updated_at = unit.updated_at;
    }
}