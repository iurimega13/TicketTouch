import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateEquipmentDto } from './dtos/createEquipment.dto';
import { ReturnEquipmentDto } from './dtos/returnEquipment.dto';
import { UpdateEquipmentDto } from './dtos/updateEquipment.dto';
import { EquipmentEntity } from './entities/equipment.entity';
import { EquipmentsService } from './equipments.service';

@Controller('equipaments')
export class EquipmentsController {
    constructor(
        private readonly equipmentsService: EquipmentsService
    ) {}

    // Criando um novo equipamento
    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() createEquipmentDto: CreateEquipmentDto): Promise<EquipmentEntity>{
        return await this.equipmentsService.createEquipment(createEquipmentDto);
    }


    // Atualizando um equipamento
    @UsePipes(ValidationPipe)
    @Put(':id')
    async update(@Body() updateEquipmentDto: UpdateEquipmentDto): Promise<EquipmentEntity> {
        return await this.equipmentsService.updateEquipment(updateEquipmentDto);
    }

    // Deletando um equipamento
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void>{
        return await this.equipmentsService.deleteEquipment(id);
    }

    // Buscando todos os equipamentos
    @Get()
    async getAll(): Promise<ReturnEquipmentDto[]>{
        return (await this.equipmentsService.getAllEquipments()).map((equipment) => new ReturnEquipmentDto(equipment));
    }
}
