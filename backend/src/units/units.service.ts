// Importando os decoradores e classes necessárias do NestJS, TypeORM e dos arquivos locais
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
            // Criando um novo objeto unit com os dados do DTO e as datas de criação e atualização
            const unit = {
                ...createUnitDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            // Salvando a unidade no banco de dados e retornando a unidade salva
            return await this.unitRepository.save(unit);
        }
        catch (error) {
            // Lançando um erro se algo der errado
            throw new Error(error);
        }
    }

    // Método para atualizar uma unidade existente
    async updateUnit(updateUnitDto: UpdateUnitDto): Promise<UnitEntity> {
        try {
            // Buscando a unidade pelo ID
            const unit = await this.getUnitById(updateUnitDto.id);
            // Lançando um erro se a unidade não for encontrada
            if (!unit) {
                throw new Error('Unit not found');
            }
            // Atualizando a unidade com os dados do DTO e a data de atualização
            const updatedUnit = {
                ...unit,
                ...updateUnitDto,
                updatedAt: new Date(),
            };
            // Salvando a unidade no banco de dados e retornando a unidade salva
            return await this.unitRepository.save(updatedUnit);
        } catch (error) {
            // Lançando um erro se algo der errado
            throw new Error(error);
        }
    }

    // Método para buscar todas as unidades
    async getAllUnits(): Promise<UnitEntity[]> {
        try {
            // Buscando todas as unidades no banco de dados e retornando a lista de unidades
            return await this.unitRepository.find();
        } catch (error) {
            // Lançando um erro se algo der errado
            throw new Error(error);
        }
    }

    // Método para buscar uma unidade pelo ID
    async getUnitById(id: number): Promise<UnitEntity> {
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
    async deleteUnit(id: number): Promise<void> {
        try {
            // Buscando a unidade pelo ID
            const unit = await this.getUnitById(id);
            // Lançando um erro se a unidade não for encontrada
            if (!unit) {
                throw new Error('Unit not found');
            }
            // Deletando a unidade do banco de dados
            await this.unitRepository.delete(id);
        } catch (error) {
            // Lançando um erro se algo der errado
            throw new Error(error);
        }
    }
}