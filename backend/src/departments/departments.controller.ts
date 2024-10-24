import { DepartmentsService } from './departments.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe, Logger, NotFoundException } from '@nestjs/common';
import { ReturnDepartmentDto } from './dtos/returnDepartment.dto';
import { UpdateDepartmentDto } from './dtos/updateDepartment.dto';
import { DepartmentEntity } from './entities/department.entity';
import { CreateDepartmentDto } from './dtos/createDepartment.dto';

@Controller('departments')
export class DepartmentsController {
  private readonly logger = new Logger(DepartmentsController.name);

  constructor(private readonly departmentsService: DepartmentsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createDepartment(@Body() createDepartmentDto: CreateDepartmentDto): Promise<DepartmentEntity> {
    return this.departmentsService.createDepartment(createDepartmentDto);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async updateDepartment(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto): Promise<DepartmentEntity> {
    return this.departmentsService.updateDepartment(id, updateDepartmentDto);
  }

  @Delete(':id')
  async deleteDepartment(@Param('id') id: string): Promise<void> {
    return this.departmentsService.deleteDepartment(id);
  }

  @Get('all')
  async getAllDepartmentsWithoutPagination(): Promise<ReturnDepartmentDto[]> {
    const departments = await this.departmentsService.getAllDepartmentsWithoutPagination();
    return departments.map(department => new ReturnDepartmentDto(department));
  }

  @Get()
  async getAllDepartmentsWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Query('filter') filter: string = '',
    @Query('sortBy') sortBy: string = 'name',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<{ data: ReturnDepartmentDto[]; total: number }> {
    const { data, total } = await this.departmentsService.getAllDepartmentsWithPagination(
      page,
      limit,
      filter,
      sortBy,
      sortOrder,
    );
    const result = data.map(department => new ReturnDepartmentDto(department));
    return { data: result, total };
  }

  @Get('unit/:unitId')
  async getDepartmentsByUnit(
    @Param('unitId') unitId: string, 
  ): Promise<{ data: ReturnDepartmentDto[]}> {
    this.logger.log(`Recebendo requisição para buscar departamentos pela unidade: ${unitId}`);

    const { data } = await this.departmentsService.getDepartmentsByUnit(unitId);
    this.logger.log(`Departamentos retornados: ${data.length}`);
    
    return { data: data.map((department) => new ReturnDepartmentDto(department)) };
  }

  @Get(':id')
  async getDepartmentById(@Param('id') id: string): Promise<ReturnDepartmentDto> {
    try {
      const department = await this.departmentsService.getDepartmentById(id);
      if (!department) {
        throw new NotFoundException('Department not found');
      }
      return new ReturnDepartmentDto(department);
    } catch (error) {
      this.logger.error(`Erro ao buscar departamento por ID: ${id}`, error.stack);
      throw new NotFoundException('Department not found');
    }
  }
}