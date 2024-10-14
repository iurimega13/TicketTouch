import { DepartmentsService } from './departments.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
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
  async getAllDepartments(@Query('unitId') unitId?: string): Promise<ReturnDepartmentDto[]> {
    this.logger.log('Recebendo requisição para buscar todos os departamentos');
    const departments = unitId 
      ? await this.departmentsService.findByUnit(unitId) 
      : await this.departmentsService.getAllDepartments();
    this.logger.log(`Departamentos retornados: ${departments.length}`);
    return departments.map((department) => new ReturnDepartmentDto(department));
  }

  @Get('unit/:unitId')
  async findByUnit(@Param('unitId') unitId: string): Promise<DepartmentEntity[]> {
    return this.departmentsService.findByUnit(unitId);
  }
}