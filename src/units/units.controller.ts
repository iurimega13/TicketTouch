// Importando os decoradores e classes necessárias do NestJS e dos arquivos locais
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUnitDto } from './dtos/createUnit.dto';
import { ReturnUnitDto } from './dtos/returnUnit.dto';
import { UpdateUnitDto } from './dtos/updateUnit.dto';
import { UnitEntity } from './entities/unit.entity';
import { UnitsService } from './units.service';

// Decorador para definir a rota base para este controlador
@Controller('units')
export class UnitsController {

    // Injeção de dependência do serviço UnitsService
    constructor(private readonly unitsService: UnitsService) {}

    // Método para criar uma nova unidade
    // Usa o decorador @Post() para definir que este método deve ser chamado quando uma requisição POST for feita para a rota '/units'
    @UsePipes(ValidationPipe)
    @Post()
    async createUnit(@Body() createUnitDto: CreateUnitDto): Promise<UnitEntity> {
        return this.unitsService.createUnit(createUnitDto);
    }

    // Método para atualizar uma unidade existente
    // Usa o decorador @Put(':id') para definir que este método deve ser chamado quando uma requisição PUT for feita para a rota '/units/:id'
    @UsePipes(ValidationPipe)
    @Put(':id')
    async updateUnit(@Param('id') id: number, @Body() updateUnitDto: UpdateUnitDto): Promise<UnitEntity> {
        return this.unitsService.updateUnit(id, updateUnitDto);
    }

    // Método para deletar uma unidade existente
    // Usa o decorador @Delete(':id') para definir que este método deve ser chamado quando uma requisição DELETE for feita para a rota '/units/:id'
    @Delete(':id')
    async deleteUnit(@Param('id') id: number): Promise<void> {
        return this.unitsService.deleteUnit(id);
    }

    // Método para buscar todas as unidades
    // Usa o decorador @Get() para definir que este método deve ser chamado quando uma requisição GET for feita para a rota '/units'
    @Get()
    async getAllUnits(): Promise<ReturnUnitDto[]> {
        return (await this.unitsService.getAllUnits()).map((unit) => new ReturnUnitDto(unit));
    }
}