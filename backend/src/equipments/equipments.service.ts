import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipmentDto } from './dtos/createEquipment.dto';
import { UpdateEquipmentDto } from './dtos/updateEquipment.dto';
import { EquipmentEntity } from './entities/equipment.entity';
import { DepartmentEntity } from 'src/departments/entities/department.entity';
import { UnitEntity } from 'src/units/entities/unit.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(EquipmentEntity)
    private readonly equipmentRepository: Repository<EquipmentEntity>,
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createEquipment(
    createEquipmentDto: CreateEquipmentDto,
  ): Promise<EquipmentEntity> {
    try {
      const { user_id, unit_id, department_id, is_shared } = createEquipmentDto;

      if (!is_shared && !user_id) {
        throw new BadRequestException(
          'O campo user_id é obrigatório quando o equipamento não é compartilhado.',
        );
      }

      const equipment = this.equipmentRepository.create({
        ...createEquipmentDto,
        user: user_id
          ? await this.userRepository.findOne({ where: { id: user_id } })
          : null,
        unit: await this.unitRepository.findOne({ where: { id: unit_id } }),
        department: await this.departmentRepository.findOne({
          where: { id: department_id },
        }),
      });

      return await this.equipmentRepository.save(equipment);
    } catch (error) {
      throw new BadRequestException('Erro ao criar equipamento');
    }
  }

  async updateEquipment(
    equipmentId: string,
    updateEquipmentDto: UpdateEquipmentDto,
  ): Promise<EquipmentEntity> {
    try {
      // Recupera o equipamento pelo ID
      const equipment = await this.getEquipmentById(equipmentId);
      if (!equipment) {
        throw new NotFoundException('Equipamento não encontrado');
      }

      // Atualiza somente os campos que foram enviados no DTO
      Object.assign(equipment, updateEquipmentDto);

      // Atualiza a data de atualização
      equipment.updated_at = new Date();

      // Salva as alterações no repositório
      return await this.equipmentRepository.save(equipment);
    } catch (error) {
      if (error instanceof NotFoundException) {
          throw error;
      }
      throw new BadRequestException('Erro ao atualizar equipamento');
    }
  }

  async deleteEquipment(id: string): Promise<void> {
    try {
      const equipment = await this.getEquipmentById(id);
      if (!equipment) {
        throw new NotFoundException('Equipamento não encontrado');
      }
      await this.equipmentRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Erro ao deletar equipamento');
    }
  }

  async getAllEquipmentsWithPagination(
    page: number,
    limit: number,
    filter: string,
    sortBy: string,
    sortOrder: 'ASC' | 'DESC',
  ): Promise<{ data: EquipmentEntity[]; total: number }> {
    try {
      const skip = (page - 1) * limit;

      const queryBuilder =
        this.equipmentRepository.createQueryBuilder('equipment');

      if (filter) {
        queryBuilder.where('equipment.name LIKE :filter', {
          filter: `%${filter}%`,
        });
      }

      queryBuilder
        .orderBy(`equipment.${sortBy}`, sortOrder)
        .skip(skip)
        .take(limit);

      const [equipments, total] = await queryBuilder.getManyAndCount();
      return { data: equipments, total };
    } catch (error) {
      throw new Error(
        `Erro ao buscar equipamentos com paginação: ${error.message}`,
      );
    }
  }

  async getAllEquipmentsWithoutPagination(): Promise<EquipmentEntity[]> {
    try {
      const equipments = await this.equipmentRepository.find({
        relations: ['user', 'unit', 'department'],
      });
      return equipments;
    } catch (error) {
      throw new Error('Erro ao buscar todos os equipamentos');
    }
  }

  async getEquipmentById(id: string): Promise<EquipmentEntity> {
    return await this.equipmentRepository.findOne({
      where: { id },
      relations: ['user', 'unit', 'department'],
    });
  }

  async findByUnit(unitId: string): Promise<EquipmentEntity[]> {
    return await this.equipmentRepository.find({
      where: { unit: { id: unitId } },
      relations: ['user', 'unit', 'department'],
    });
  }
}
