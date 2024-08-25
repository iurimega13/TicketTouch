import { DepartmentsService } from './departments.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnDepartmentDto } from './dtos/returnDepartment.dto';
import { UpdateDepartmentDto } from './dtos/updateDepartment.dto';
import { DepartmentEntity } from './entities/department.entity';
import { CreateDepartmentDto } from './dtos/createDepartment.dto';

@Controller('departments')
export class DepartamentsController {

    constructor(private readonly DepartmentsService: DepartmentsService) {}

    // Método para criar um novo departamento
    // Usa o decorador @Post() para definir que este método deve ser chamado quando uma requisição POST for feita para a rota '/departaments'
    @UsePipes(ValidationPipe)
    @Post()
    async createDepartment(@Body() createDepartmentDto: CreateDepartmentDto): Promise<DepartmentEntity> {
        return this.DepartmentsService.createDepartment(createDepartmentDto);
    }

    // Método para atualizar um departamento existente
    // Usa o decorador @Put(':id') para definir que este método deve ser chamado quando uma requisição PUT for feita para a rota '/departaments/:id'
    @UsePipes(ValidationPipe)
    @Put(':id')
    async updateDepartment(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto): Promise<DepartmentEntity> {
        return this.DepartmentsService.updateDepartment(id, updateDepartmentDto);
    }

    // Método para deletar um departamento existente
    // Usa o decorador @Delete(':id') para definir que este método deve ser chamado quando uma requisição DELETE for feita para a rota '/departaments/:id'
    @Delete(':id')
    async deleteDepartment(@Param('id') id: string): Promise<void> {
        return this.DepartmentsService.deleteDepartament(id);
    }

    // Método para buscar todos os departamentos
    // Usa o decorador @Get() para definir que este método deve ser chamado quando uma requisição GET for feita para a rota '/departaments'
    @Get()
    async getAllDepartments(): Promise<ReturnDepartmentDto[]> {
        return (await this.DepartmentsService.getAllDepartments()).map((department) => new ReturnDepartmentDto(department));
    }
}
