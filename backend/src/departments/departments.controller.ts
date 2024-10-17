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

  @Get()
  async getAllDepartments(@Query('page') page = 1, @Query('limit') limit = 10): Promise<{ data: ReturnDepartmentDto[], total: number }> {
    this.logger.log('Recebendo requisição para buscar todos os departamentos');
    const { data, total } = await this.departmentsService.getAllDepartments(page, limit);
    this.logger.log(`Departamentos retornados: ${data.length}`);
    
    const validDepartments = data.filter(department => department && department.id && department.unit);
    if (validDepartments.length !== data.length) {
      this.logger.warn(`Alguns departamentos retornados são inválidos. Válidos: ${validDepartments.length}, Inválidos: ${data.length - validDepartments.length}`);
    }

    return { data: validDepartments.map((department) => new ReturnDepartmentDto(department)), total };
  }

  @Get('unit/:unitId')
  async getDepartmentsByUnit(@Query('unitId') unitId: string, @Query('page') page = 1, @Query('limit') limit = 10): Promise<{ data: ReturnDepartmentDto[], total: number }> {
    this.logger.log(`Recebendo requisição para buscar departamentos pela unidade: ${unitId}`);
    const { data, total } = await this.departmentsService.getDepartmentsByUnit(unitId, page, limit);
    this.logger.log(`Departamentos retornados: ${data.length}`);
    
    const validDepartments = data.filter(department => department && department.id && department.unit);
    if (validDepartments.length !== data.length) {
      this.logger.warn(`Alguns departamentos retornados são inválidos. Válidos: ${validDepartments.length}, Inválidos: ${data.length - validDepartments.length}`);
    }

    return { data: validDepartments.map((department) => new ReturnDepartmentDto(department)), total };
  }

  @Get(':id')
  async getDepartmentById(@Param('id') id: string): Promise<DepartmentEntity> {
    try {
      const department = await this.departmentsService.getDepartmentById(id);
      if (!department) {
        throw new NotFoundException('Department not found');
      }
      return department;
    } catch (error) {
      throw new NotFoundException('Department not found');
    }
  }
}
