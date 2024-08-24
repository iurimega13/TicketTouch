import { UnitEntity } from "../entities/unit.entity";
export declare class ReturnUnitDto {
    id: number;
    name: string;
    address: string;
    created_at: Date;
    updated_at: Date;
    constructor(unit: UnitEntity);
}
