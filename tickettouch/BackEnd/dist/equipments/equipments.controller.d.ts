import { CreateEquipmentDto } from './dtos/createEquipment.dto';
import { ReturnEquipmentDto } from './dtos/returnEquipment.dto';
import { UpdateEquipmentDto } from './dtos/updateEquipment.dto';
import { EquipmentEntity } from './entities/equipment.entity';
import { EquipmentsService } from './equipments.service';
export declare class EquipmentsController {
    private readonly equipmentsService;
    constructor(equipmentsService: EquipmentsService);
    create(createEquipmentDto: CreateEquipmentDto): Promise<EquipmentEntity>;
    update(updateEquipmentDto: UpdateEquipmentDto): Promise<EquipmentEntity>;
    delete(id: number): Promise<void>;
    getAll(): Promise<ReturnEquipmentDto[]>;
}
