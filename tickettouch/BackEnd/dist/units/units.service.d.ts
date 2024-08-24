import { Repository } from 'typeorm';
import { UnitEntity } from './entities/unit.entity';
import { CreateUnitDto } from './dtos/createUnit.dto';
import { UpdateUnitDto } from './dtos/updateUnit.dto';
export declare class UnitsService {
    private readonly unitRepository;
    constructor(unitRepository: Repository<UnitEntity>);
    createUnit(createUnitDto: CreateUnitDto): Promise<UnitEntity>;
    updateUnit(updateUnitDto: UpdateUnitDto): Promise<UnitEntity>;
    getAllUnits(): Promise<UnitEntity[]>;
    getUnitById(id: number): Promise<UnitEntity>;
    deleteUnit(id: number): Promise<void>;
}
