import { DepartamentsService } from './departaments.service';
import { ReturnDepartamentDto } from './dtos/returnDepartament.dto';
import { UpdateDepartamentDto } from './dtos/updateDepartament.dto';
import { DepartamentEntity } from './entities/departament.entity';
import { CreateDepartamentDto } from './dtos/createDepartament.dto';
export declare class DepartamentsController {
    private readonly DepartamentsService;
    constructor(DepartamentsService: DepartamentsService);
    createDepartament(createDepartamentDto: CreateDepartamentDto): Promise<DepartamentEntity>;
    updateDepartament(id: number, updateDepartamentDto: UpdateDepartamentDto): Promise<DepartamentEntity>;
    deleteDepartament(id: number): Promise<void>;
    getAllDepartaments(): Promise<ReturnDepartamentDto[]>;
}
