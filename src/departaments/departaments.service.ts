import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDepartamentDto } from './dtos/updateDepartament.dto';
import { DepartamentEntity } from './entities/departament.entity';
import { CreateDepartamentDto } from './dtos/createDepartament.dto';

@Injectable()
export class DepartamentsService {

    // Injeção de dependência do repositório de departamentos
    constructor(
        @InjectRepository(DepartamentEntity)
        private readonly departamentRepository: Repository<DepartamentEntity>,
    ) {}

    // Método para criar um novo departamento
    async createDepartament(createDepartamentDto: CreateDepartamentDto): Promise<DepartamentEntity> {
        try {
            // Criando um novo objeto departament com os dados do DTO e as datas de criação e atualização
            const departament = {
                ...createDepartamentDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            // Salvando o departamento no banco de dados e retornando o departamento salvo
            return await this.departamentRepository.save(departament);
        }
        catch (error) {
            // Lançando um erro se algo der errado
            throw new Error(error);
        }
    }

    // Método para atualizar um departamento existente
    async updateDepartament(id: number, updateDepartamentDto: UpdateDepartamentDto): Promise<DepartamentEntity> {
        try {
            // Buscando o departamento pelo ID
            const departament = await this.getDepartamentById(id);
            
            // Lançando um erro se o departamento não for encontrado
            if (!departament) {
                throw new Error('Departament not found');
            }
            // Criando um novo objeto com os dados do departamento atualizados e a data de atualização
            const updatedDepartament = {
                ...departament,
                ...updateDepartamentDto,
                updatedAt: new Date(),
            };
            // Salvando o departamento atualizado no banco de dados e retornando o departamento atualizado
            return await this.departamentRepository.save(updatedDepartament);
        } catch (error) {
            // Lançando um erro se algo der errado
            throw new Error(error);
        }
    }

    // Método para buscar todos os departamentos
    async getAllDepartaments(): Promise<DepartamentEntity[]> {
        try {
            // Buscando todos os departamentos no banco de dados e retornando a lista de departamentos
            return await this.departamentRepository.find();
        } catch (error) {
            // Lançando um erro se algo der errado
            throw new Error(error);
        }
    }

    // Método para buscar um departamento pelo ID
    async getDepartamentById(id: number): Promise<DepartamentEntity> {
        try {
            // Buscando o departamento pelo ID e retornando o departamento encontrado
            return await this.departamentRepository.findOne({ where: { id } });
        } catch (error) {
            // Lançando um erro se algo der errado
            throw new Error(error);
        }
    }

    // Método para deletar um departamento existente
    async deleteDepartament(id: number): Promise<void> {
        try {
            // Deletando o departamento pelo ID
            await this.departamentRepository.delete(id);
        } catch (error) {
            // Lançando um erro se algo der errado
            throw new Error(error);
        }
    }
}
