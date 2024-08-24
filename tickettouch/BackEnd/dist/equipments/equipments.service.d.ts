import { Repository } from 'typeorm';
import { CreateEquipmentDto } from './dtos/createEquipment.dto';
import { UpdateEquipmentDto } from './dtos/updateEquipment.dto';
import { EquipmentEntity } from './entities/equipment.entity';
export declare class EquipmentsService {
    private readonly equipmentRepository;
    constructor(equipmentRepository: Repository<EquipmentEntity>);
    createEquipment(createEquipmentDto: CreateEquipmentDto): Promise<EquipmentEntity>;
    updateEquipment(updateEquipmentDto: UpdateEquipmentDto): Promise<EquipmentEntity>;
    deleteEquipment(id: number): Promise<void>;
    getAllEquipments(): Promise<EquipmentEntity[]>;
    getEquipmentById(id: number): Promise<EquipmentEntity>;
}
