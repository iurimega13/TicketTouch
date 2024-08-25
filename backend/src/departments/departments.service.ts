import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDepartmentDto } from './dtos/updateDepartment.dto';
import { DepartmentEntity } from './entities/department.entity';
import { CreateDepartmentDto } from './dtos/createDepartment.dto';

@Injectable()
export class DepartmentsService {

    // Injeção de dependência do repositório de departamentos
    constructor(
        @InjectRepository(DepartmentEntity)
        private readonly departmentRepository: Repository<DepartmentEntity>,
    ) {}

    // Método para criar um novo departamento
    async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<DepartmentEntity> {
        try {
            // Criando um novo objeto departament com os dados do DTO e as datas de criação e atualização
            const departament = {
                ...createDepartmentDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            // Salvando o departamento no banco de dados e retornando o departamento salvo
            return await this.departmentRepository.save(departament);
        }
        catch (error) {
            // Lançando um erro se algo der errado
            throw new Error(error);
        }
    }

    // Método para atualizar um departamento existente
    async updateDepartment(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<DepartmentEntity> {
        try {
            // Buscando o departamento pelo ID
            const department = await this.getDepartmentById(id);
            
            // Lançando um erro se o departamento não for encontrado
            if (!department) {
                throw new Error('Departament not found');
            }
            // Criando um novo objeto com os dados do departamento atualizados e a data de atualização
            const updatedDepartment = {
                ...department,
                ...updateDepartmentDto,
                updatedAt: new Date(),
            };
            // Salvando o departamento atualizado no banco de dados e retornando o departamento atualizado
            return await this.departmentRepository.save(updatedDepartment);
        } catch (error) {
            // Lançando um erro se algo der errado
            throw new Error(error);
        }
    }

    // Método para buscar todos os departamentos
    async getAllDepartments(): Promise<DepartmentEntity[]> {
        try {
            // Buscando todos os departamentos no banco de dados e retornando a lista de departamentos
            return await this.departmentRepository.find();
        } catch (error) {
            // Lançando um erro se algo der errado
            throw new Error(error);
        }
    }

    // Método para buscar um departamento pelo ID
    async getDepartmentById(id: string): Promise<DepartmentEntity> {
        try {
            // Buscando o departamento pelo ID e retornando o departamento encontrado
            return await this.departmentRepository.findOne({ where: { id } });
        } catch (error) {
            // Lançando um erro se algo der errado
            throw new Error(error);
        }
    }

    // Método para deletar um departamento existente
    async deleteDepartament(id: string): Promise<void> {
        try {
            // Deletando o departamento pelo ID
            await this.departmentRepository.delete(id);
        } catch (error) {
            // Lançando um erro se algo der errado
            throw new Error(error);
        }
    }
}
