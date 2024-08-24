import { Repository } from 'typeorm';
import { UpdateDepartamentDto } from './dtos/updateDepartament.dto';
import { DepartamentEntity } from './entities/departament.entity';
import { CreateDepartamentDto } from './dtos/createDepartament.dto';
export declare class DepartamentsService {
    private readonly departamentRepository;
    constructor(departamentRepository: Repository<DepartamentEntity>);
    createDepartament(createDepartamentDto: CreateDepartamentDto): Promise<DepartamentEntity>;
    updateDepartament(id: number, updateDepartamentDto: UpdateDepartamentDto): Promise<DepartamentEntity>;
    getAllDepartaments(): Promise<DepartamentEntity[]>;
    getDepartamentById(id: number): Promise<DepartamentEntity>;
    deleteDepartament(id: number): Promise<void>;
}
