import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipmentDto } from './dtos/createEquipment.dto';
import { UpdateEquipmentDto } from './dtos/updateEquipment.dto';
import { EquipmentEntity } from './entities/equipment.entity';

@Injectable()
export class EquipmentsService {

    constructor(
        @InjectRepository(EquipmentEntity)
        private readonly equipmentRepository: Repository<EquipmentEntity>,
    ) {}

    async createEquipment(createEquipmentDto: CreateEquipmentDto): Promise<EquipmentEntity> {
        try {
            const equipment = {
                ...createEquipmentDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            return await this.equipmentRepository.save(equipment);
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async updateEquipment(updateEquipmentDto: UpdateEquipmentDto): Promise<EquipmentEntity> {
        try {
            const equipment = await this.getEquipmentById(updateEquipmentDto.id);
            if (!equipment) {
                throw new Error('Equipment not found');
            }
            const updatedEquipment = {
                ...equipment,
                ...updateEquipmentDto,
                updatedAt: new Date(),
            };
            return await this.equipmentRepository.save(updatedEquipment);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteEquipment(id: number): Promise<void> {
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

    async getEquipmentById(id: number): Promise<EquipmentEntity> {
        try {
            return await this.equipmentRepository.findOne({where: {id}});
        } catch (error) {
            throw new Error(error);
        }
    }
}
