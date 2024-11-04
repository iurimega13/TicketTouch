import { SlaEntity } from "../entities/sla.entity";


export class ReturnSlaDto {

    id: string;
    name: string;
    description: string;
    response_time: number;
    resolution_time: number;
    created_at: Date;

    constructor(sla: SlaEntity) {
        this.id = sla.id;
        this.name = sla.name;
        this.description = sla.description;
        this.response_time = sla.response_time;
        this.resolution_time = sla.resolution_time;
        this.created_at = sla.created_at;
    }
}