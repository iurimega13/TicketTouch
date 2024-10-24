// Importando os decoradores e classes necessárias do NestJS e dos arquivos locais
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUnitDto } from './dtos/createUnit.dto';
import { ReturnUnitDto } from './dtos/returnUnit.dto';
import { UpdateUnitDto } from './dtos/updateUnit.dto';
import { UnitEntity } from './entities/unit.entity';
import { UnitsService } from './units.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Decorador para definir a rota base para este controlador
@Controller('units')
export class UnitsController {
  // Injeção de dependência do serviço UnitsService
  constructor(
    private readonly unitsService: UnitsService,
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
  ) {}

  // Método para criar uma nova unidade
  @UsePipes(ValidationPipe)
  @Post()
  async createUnit(@Body() createUnitDto: CreateUnitDto): Promise<UnitEntity> {
    return this.unitsService.createUnit(createUnitDto);
  }
  
// Método para buscar todas as unidades sem paginação
  @Get('all')
  async getAllUnitsWithoutPagination(): Promise<ReturnUnitDto[]> {
    const units = await this.unitsService.getAllUnitsWithoutPagination();
    return units.map(unit => new ReturnUnitDto(unit));
  }

// Método para buscar todas as unidades com paginação, filtro e ordenação
  @Get()
  async getAllUnitsWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Query('filter') filter: string = '',
    @Query('sortBy') sortBy: string = 'name',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<{ data: ReturnUnitDto[]; total: number }> {
    const { data, total } = await this.unitsService.getAllUnitsWithPagination(
      page,
      limit,
      filter,
      sortBy,
      sortOrder,
    );
    const result = data.map(unit => new ReturnUnitDto(unit));
    return { data: result, total };
  }
// Método para buscar uma unidade pelo ID
  @Get(':id')
  async getUnitById(@Param('id') id: string): Promise<UnitEntity> {
    try {
      const unit = await this.unitsService.getUnitById(id);
      return unit;
    } catch (error) {
      throw new NotFoundException('Unit not found');
    }
  }

  // Método para atualizar uma unidade existente
  @UsePipes(ValidationPipe)
  @Put(':id')
  async updateUnit(@Body() updateUnitDto: UpdateUnitDto): Promise<UnitEntity> {
    return this.unitsService.updateUnit(updateUnitDto);
  }

  // Método para deletar uma unidade existente
  @Delete(':id')
  async deleteUnit(@Param('id') id: string): Promise<void> {
    return this.unitsService.deleteUnit(id);
  }
}
