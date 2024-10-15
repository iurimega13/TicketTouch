import { Injectable, BadRequestException } from '@nestjs/common';
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

    async createEquipment(createEquipmentDto: CreateEquipmentDto): Promise<EquipmentEntity> {
        const { user_id, unit_id, department_id, is_shared } = createEquipmentDto;

        if (!is_shared && !user_id) {
            throw new BadRequestException('O campo user_id é obrigatório quando o equipamento não é compartilhado.');
        }

        const equipment = this.equipmentRepository.create({
            ...createEquipmentDto,
            user: user_id ? await this.userRepository.findOne({ where: { id: user_id } }) : null,
            unit: await this.unitRepository.findOne({ where: { id: unit_id } }),
            department: await this.departmentRepository.findOne({ where: { id: department_id } }),
        });

        return await this.equipmentRepository.save(equipment);
    }

    async updateEquipment(equipmentId: string, updateEquipmentDto: UpdateEquipmentDto): Promise<EquipmentEntity> {
        try {
            const equipment = await this.getEquipmentById(equipmentId);
            if (!equipment) {
                throw new Error('Equipment not found');
            }
            const updatedEquipment = {
                ...equipment,
                ...updateEquipmentDto,
                updated_at: new Date(),
            };
            return await this.equipmentRepository.save(updatedEquipment);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteEquipment(id: string): Promise<void> {
        try {
            const equipment = await this.getEquipmentById(id);
            if (!equipment) {
                throw new Error('Equipment not found');
            }
            await this.equipmentRepository.delete(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllEquipments(): Promise<EquipmentEntity[]> {
        try {
            return await this.equipmentRepository.find();
        } catch (error) {
            throw new Error(error);
        }
    }

    async getEquipmentById(id: string): Promise<EquipmentEntity> {
        try {
            return await this.equipmentRepository.findOne({ where: { id } });
        } catch (error) {
            throw new Error(error);
        }
    }
}