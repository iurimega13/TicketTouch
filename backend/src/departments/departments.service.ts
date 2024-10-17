import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDepartmentDto } from './dtos/updateDepartment.dto';
import { DepartmentEntity } from './entities/department.entity';
import { CreateDepartmentDto } from './dtos/createDepartment.dto';

@Injectable()
export class DepartmentsService {
  private readonly logger = new Logger(DepartmentsService.name);

  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async findByUnit(unitId: string): Promise<DepartmentEntity[]> {
    try {
      return await this.departmentRepository.find({ where: { unit: { id: unitId } } });
    } catch (error) {
      this.logger.error('Erro ao buscar departamentos por unidade', error.stack);
      throw new Error(`Erro ao buscar departamentos por unidade: ${error.message}`);
    }
  }

  async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<DepartmentEntity> {
    try {
      const department = {
        ...createDepartmentDto,
        created_at: new Date(),
        updated_at: new Date(),
      };
      return await this.departmentRepository.save(department);
    } catch (error) {
      this.logger.error('Erro ao criar departamento', error.stack);
      throw new Error(error);
    }
  }

  async updateDepartment(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<DepartmentEntity> {
    try {
      const department = await this.getDepartmentById(id);
      if (!department) {
        throw new Error('Department not found');
      }
      const updatedDepartment = {
        ...department,
        ...updateDepartmentDto,
        updated_at: new Date(),
      };
      return await this.departmentRepository.save(updatedDepartment);
    } catch (error) {
      this.logger.error('Erro ao atualizar departamento', error.stack);
      throw new Error(error);
    }
  }

  async getAllDepartments(page: number, limit: number): Promise<{ data: DepartmentEntity[], total: number }> {
    try {
      this.logger.log('Buscando todos os departamentos');
      const [departments, total] = await this.departmentRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['unit'], // Certifique-se de carregar a relação 'unit'
      });
      this.logger.log(`Departamentos encontrados: ${departments.length}`);
      return { data: departments, total };
    } catch (error) {
      this.logger.error('Erro ao buscar departamentos', error.stack);
      throw new Error(error);
    }
  }

  async getDepartmentsByUnit(unitId: string, page: number, limit: number): Promise<{ data: DepartmentEntity[], total: number }> {
    try {
      this.logger.log(`Buscando departamentos pela unidade: ${unitId}`);
      const [departments, total] = await this.departmentRepository.findAndCount({
        where: { unit: { id: unitId } },
        skip: (page - 1) * limit,
        take: limit,
        relations: ['unit'],
      });
      this.logger.log(`Departamentos encontrados: ${departments.length}`);
      return { data: departments, total };
    } catch (error) {
      this.logger.error('Erro ao buscar departamentos pela unidade', error.stack);
      throw new Error(error);
    }
  }


  async getDepartmentById(id: string): Promise<DepartmentEntity> {
    try {
      return await this.departmentRepository.findOne({ where: { id }, relations: ['unit'] });
    } catch (error) {
      this.logger.error('Erro ao buscar departamento por ID', error.stack);
      throw new Error(error);
    }
  }

  async deleteDepartment(id: string): Promise<void> {
    try {
      await this.departmentRepository.delete(id);
    } catch (error) {
      this.logger.error('Erro ao deletar departamento', error.stack);
      throw new Error(error);
    }
  }
}