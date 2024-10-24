import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateEquipmentDto } from './dtos/createEquipment.dto';
import { UpdateEquipmentDto } from './dtos/updateEquipment.dto';
import { EquipmentEntity } from './entities/equipment.entity';
import { EquipmentsService } from './equipments.service';

@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createEquipmentDto: CreateEquipmentDto): Promise<EquipmentEntity> {
    return await this.equipmentsService.createEquipment(createEquipmentDto);
  }

  @UsePipes(ValidationPipe)
  @Put(':equipmentId')
  async update(@Param('equipmentId') equipmentId: string, @Body() updateEquipmentDto: UpdateEquipmentDto): Promise<EquipmentEntity> {
    return await this.equipmentsService.updateEquipment(equipmentId, updateEquipmentDto);
  }

  @Delete(':equipmentId')
  async delete(@Param('equipmentId') equipmentId: string): Promise<void> {
    return await this.equipmentsService.deleteEquipment(equipmentId);
  }

  @Get('all')
  async getAllEquipmentsWithoutPagination(): Promise<EquipmentEntity[]> {
    return await this.equipmentsService.getAllEquipmentsWithoutPagination();
  }

  @Get()
  async getAllEquipmentsWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: string = '',
    @Query('sortBy') sortBy: string = 'name',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<{ data: EquipmentEntity[]; total: number }> {
    return await this.equipmentsService.getAllEquipmentsWithPagination(page, limit, filter, sortBy, sortOrder);
  }

  @Get(':id')
  async getEquipmentById(@Param('id') id: string): Promise<EquipmentEntity> {
    try {
      const equipment = await this.equipmentsService.getEquipmentById(id);
      if (!equipment) {
        throw new NotFoundException('Equipment not found');
      }
      return equipment;
    } catch (error) {
      throw new NotFoundException('Equipment not found');
    }
  }
}