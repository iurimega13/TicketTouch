// Importando os decoradores e classes necessárias do NestJS, TypeORM e dos arquivos locais
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UnitEntity } from './entities/unit.entity';
import { CreateUnitDto } from './dtos/createUnit.dto';
import { UpdateUnitDto } from './dtos/updateUnit.dto';

// Decorador para definir que esta classe pode ser injetada como dependência
@Injectable()
export class UnitsService {
  // Injeção de dependência do repositório do TypeORM para a entidade UnitEntity
  constructor(
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
  ) {}

  // Método para criar uma nova unidade
  async createUnit(createUnitDto: CreateUnitDto): Promise<UnitEntity> {
    try {
      const unit = {
        ...createUnitDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return await this.unitRepository.save(unit);
    } catch (error) {
      throw new BadRequestException('Erro ao criar unidade');
    }
  }

  // Método para atualizar uma unidade existente
  async updateUnit(updateUnitDto: UpdateUnitDto): Promise<UnitEntity> {
    try {
      const unit = await this.getUnitById(updateUnitDto.id);
      if (!unit) {
        throw new NotFoundException('Unidade não encontrada');
      }
      const updatedUnit = {
        ...unit,
        ...updateUnitDto,
        updatedAt: new Date(),
      };
      return await this.unitRepository.save(updatedUnit);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar unidade');
    }
  }

 // Método para buscar todas as unidades com paginação, filtro e ordenação
 async getAllUnitsWithPagination(
  page: number,
  limit: number,
  filter: string,
  sortBy: string,
  sortOrder: 'ASC' | 'DESC',
): Promise<{ data: UnitEntity[]; total: number }> {
  try {
    const skip = (page - 1) * limit;

    // Construir a query com filtro, paginação e ordenação
    const queryBuilder = this.unitRepository.createQueryBuilder('unit');

    if (filter) {
      queryBuilder.where('unit.name LIKE :filter', { filter: `%${filter}%` });
    }

    queryBuilder.orderBy(`unit.${sortBy}`, sortOrder).skip(skip).take(limit);

    const [units, total] = await queryBuilder.getManyAndCount();
    return { data: units, total };
  } catch (error) {
    throw new Error(`Erro ao buscar unidades com paginação: ${error.message}`);
  }
}

  // Método para buscar todas as unidades sem paginação
  async getAllUnitsWithoutPagination(): Promise<UnitEntity[]> {
    try {
      const units = await this.unitRepository.find();
      return units;
    } catch (error) {
      throw new Error('Erro ao buscar todas as unidades');
    }
  }
  // Método para buscar uma unidade pelo ID
  async getUnitById(id: string): Promise<UnitEntity> {
    try {
      // Buscando a unidade pelo ID no banco de dados
      const unit = await this.unitRepository.findOne({ where: { id } });
      // Lançando um erro se a unidade não for encontrada
      if (!unit) {
        throw new Error('Unit not found');
      }
      // Retornando a unidade encontrada
      return unit;
    } catch (error) {
      // Lançando um erro se algo der errado
      throw new Error(error);
    }
  }

  // Método para deletar uma unidade pelo ID
  async deleteUnit(id: string): Promise<void> {
    try {
      const unit = await this.getUnitById(id);
      if (!unit) {
        throw new NotFoundException('Unidade não encontrada');
      }
      await this.unitRepository.delete(id);
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('violates foreign key constraint')) {
        throw new BadRequestException('Não é possível deletar a unidade porque ela está vinculada a outros registros.');
      }
      throw new BadRequestException('Erro ao deletar unidade');
    }
  }
}
