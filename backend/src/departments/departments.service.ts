import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UpdateDepartmentDto } from './dtos/updateDepartment.dto';
import { DepartmentEntity } from './entities/department.entity';
import { CreateDepartmentDto } from './dtos/createDepartment.dto';
import { UnitEntity } from '../units/entities/unit.entity'; 

@Injectable()
export class DepartmentsService {
  private readonly logger = new Logger(DepartmentsService.name);

  constructor(
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  // Criação de um novo departamento
  async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<DepartmentEntity> {
    try {
      const unit = await this.unitRepository.findOne({ where: { id: createDepartmentDto.unit_id } });
      if (!unit) {
        throw new NotFoundException('Unidade não encontrada');
      }

      const department = this.departmentRepository.create({
        ...createDepartmentDto,
        unit,
        created_at: new Date(),
        updated_at: new Date(),
      });

      this.logger.log('Criando departamento ', department);
      await this.departmentRepository.save(department);
      return department;
    } catch (error) {
      this.logger.error('Erro ao criar departamento', error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao criar departamento');
    }
  }

  // Atualização de um departamento existente
  async updateDepartment(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<DepartmentEntity> {
    try {
      const department = await this.getDepartmentById(id);
      if (!department) {
        throw new NotFoundException('Departamento não encontrado');
      }
      const updatedDepartment = {
        ...department,
        ...updateDepartmentDto,
        updated_at: new Date(),
      };
      return await this.departmentRepository.save(updatedDepartment);
    } catch (error) {
      this.logger.error('Erro ao atualizar departamento', error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao atualizar departamento');
    }
  }

  // Método para buscar todos os departamentos com paginação, filtro e ordenação (case-insensitive)
  async getAllDepartmentsWithPagination(
    page: number,
    limit: number,
    filter: string,
    sortBy: string,
    sortOrder: 'ASC' | 'DESC',
  ): Promise<{ data: DepartmentEntity[]; total: number }> {
    try {
      const skip = (page - 1) * limit;

      const queryBuilder = this.departmentRepository.createQueryBuilder('department');

      if (filter) {
        queryBuilder.where('LOWER(department.name) LIKE :filter', { filter: `%${filter.toLowerCase()}%` });
      }

      queryBuilder.orderBy(`department.${sortBy}`, sortOrder).skip(skip).take(limit);

      queryBuilder.leftJoinAndSelect('department.unit', 'unit');  // Carregar a relação 'unit'

      const [departments, total] = await queryBuilder.getManyAndCount();
      return { data: departments, total };
    } catch (error) {
      throw new Error(`Erro ao buscar departamentos com paginação: ${error.message}`);
    }
  }

  // Método para buscar todos os departamentos sem paginação
  async getAllDepartmentsWithoutPagination(): Promise<DepartmentEntity[]> {
    try {
      const departments = await this.departmentRepository.find({
        relations: ['unit'],
      });
      return departments;
    } catch (error) {
      throw new Error('Erro ao buscar todos os departamentos');
    }
  }

  // Busca de departamentos por unidade
  async getDepartmentsByUnit(
    unitId: string
  ): Promise<{ data: DepartmentEntity[]}> {
    try {
      this.logger.log(`Buscando departamentos pela unidade: ${unitId}`);
      
      const [departments] = await this.departmentRepository.findAndCount({
        where: { unit: { id: unitId } }, 
        relations: ['unit'], 
      });
      
      this.logger.log(`Departamentos encontrados: ${departments.length}`);
      return { data: departments };
    } catch (error) {
      this.logger.error('Erro ao buscar departamentos pela unidade', error.stack);
      throw new Error(error);
    }
  }

  // Busca de departamento por ID
  async getDepartmentById(id: string): Promise<DepartmentEntity> {
    try {
      return await this.departmentRepository.findOne({ where: { id }, relations: ['unit'] });
    } catch (error) {
      this.logger.error('Erro ao buscar departamento por ID', error.stack);
      throw new Error(error);
    }
  }

  // Exclusão de departamento
  async deleteDepartment(id: string): Promise<void> {
    try {
      const department = await this.getDepartmentById(id);
      if (!department) {
        throw new NotFoundException('Departamento não encontrado');
      }
      await this.departmentRepository.delete(id);
    } catch (error) {
      this.logger.error('Erro ao deletar departamento', error.stack);
      if (error instanceof QueryFailedError && error.message.includes('violates foreign key constraint')) {
        throw new BadRequestException('Não é possível deletar o departamento porque ele está vinculado a outros registros.');
      }
      throw new BadRequestException('Erro ao deletar departamento');
    }
  }
}
