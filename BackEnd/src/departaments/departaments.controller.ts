import { DepartamentsService } from './departaments.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnDepartamentDto } from './dtos/returnDepartament.dto';
import { UpdateDepartamentDto } from './dtos/updateDepartament.dto';
import { DepartamentEntity } from './entities/departament.entity';
import { CreateDepartamentDto } from './dtos/createDepartament.dto';

@Controller('departaments')
export class DepartamentsController {

    constructor(private readonly DepartamentsService: DepartamentsService) {}

    // Método para criar um novo departamento
    // Usa o decorador @Post() para definir que este método deve ser chamado quando uma requisição POST for feita para a rota '/departaments'
    @UsePipes(ValidationPipe)
    @Post()
    async createDepartament(@Body() createDepartamentDto: CreateDepartamentDto): Promise<DepartamentEntity> {
        return this.DepartamentsService.createDepartament(createDepartamentDto);
    }

    // Método para atualizar um departamento existente
    // Usa o decorador @Put(':id') para definir que este método deve ser chamado quando uma requisição PUT for feita para a rota '/departaments/:id'
    @UsePipes(ValidationPipe)
    @Put(':id')
    async updateDepartament(@Param('id') id: number, @Body() updateDepartamentDto: UpdateDepartamentDto): Promise<DepartamentEntity> {
        return this.DepartamentsService.updateDepartament(id, updateDepartamentDto);
    }

    // Método para deletar um departamento existente
    // Usa o decorador @Delete(':id') para definir que este método deve ser chamado quando uma requisição DELETE for feita para a rota '/departaments/:id'
    @Delete(':id')
    async deleteDepartament(@Param('id') id: number): Promise<void> {
        return this.DepartamentsService.deleteDepartament(id);
    }

    // Método para buscar todos os departamentos
    // Usa o decorador @Get() para definir que este método deve ser chamado quando uma requisição GET for feita para a rota '/departaments'
    @Get()
    async getAllDepartaments(): Promise<ReturnDepartamentDto[]> {
        return (await this.DepartamentsService.getAllDepartaments()).map((departament) => new ReturnDepartamentDto(departament));
    }
}
