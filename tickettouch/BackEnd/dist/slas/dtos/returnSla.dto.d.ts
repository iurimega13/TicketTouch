import { SlaEntity } from "../entities/sla.entity";
export declare class ReturnSlaDto {
    id: number;
    name: string;
    description: string;
    response_time: number;
    resolution_time: number;
    constructor(sla: SlaEntity);
}
