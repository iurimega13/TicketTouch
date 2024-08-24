import { CreateUnitDto } from './dtos/createUnit.dto';
import { ReturnUnitDto } from './dtos/returnUnit.dto';
import { UpdateUnitDto } from './dtos/updateUnit.dto';
import { UnitEntity } from './entities/unit.entity';
import { UnitsService } from './units.service';
export declare class UnitsController {
    private readonly unitsService;
    constructor(unitsService: UnitsService);
    createUnit(createUnitDto: CreateUnitDto): Promise<UnitEntity>;
    updateUnit(updateUnitDto: UpdateUnitDto): Promise<UnitEntity>;
    deleteUnit(id: number): Promise<void>;
    getAllUnits(): Promise<ReturnUnitDto[]>;
}
