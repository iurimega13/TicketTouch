import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTicketCategoryDto } from './dtos/updateTicketCategory.dto';
import { TicketCategoryEntity } from './entities/ticketCategory.entity';
import { CreateTicketCategoryDto } from './dtos/createTicketCategory.dto';

@Injectable()
export class TicketCategoriesService {

    // Injeção de dependência do repositório TicketCategoryEntity
    constructor(
        @InjectRepository(TicketCategoryEntity)
        private readonly ticketCategoryRepository: Repository<TicketCategoryEntity>,
    ) { }
    
    // Método para criar uma nova categoria de ticket
    async createTicketCategory(createTicketCategoryDto: CreateTicketCategoryDto): Promise<TicketCategoryEntity> {
        try {
            const ticketCategory = {
                ...createTicketCategoryDto,
            };
            return await this.ticketCategoryRepository.save(ticketCategory);
        }
        catch (error) {
            throw new Error(error); // Retorna um erro caso ocorra algum problema
        }
    }
    
    /// Método para atualizar uma categoria de ticket existente
// ticket-categories.service.ts
async updateTicketCategory(updateTicketCategoryDto: UpdateTicketCategoryDto): Promise<TicketCategoryEntity> {
    try {
        const ticketCategory = await this.getTicketCategoryById(updateTicketCategoryDto.id);
        if (!ticketCategory) {
            throw new Error('Ticket Category not found'); // Retorna um erro caso a categoria de ticket não seja encontrada
        }

        const updatedTicketCategory = {
            ...ticketCategory,
            ...updateTicketCategoryDto,
        };

        return await this.ticketCategoryRepository.save(updatedTicketCategory);
    } catch (error) {
        throw new Error(error);
    }
}


    // Método para buscar todas as categorias de ticket
    async getAllTicketCategories(): Promise<TicketCategoryEntity[]> {
        try {
            return await this.ticketCategoryRepository.find();
        } catch (error) {
            throw new Error(error);
        }
    }


    // Método para buscar uma categoria de ticket por id
    async getTicketCategoryById(id: string): Promise<TicketCategoryEntity> {
        try {
            return await this.ticketCategoryRepository.findOne({where: {id}});
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para deletar uma categoria de ticket existente
    async deleteTicketCategory(id: string): Promise<void> {
        try {
            const ticketCategory = await this.getTicketCategoryById(id);
            if (!ticketCategory) {
                throw new Error('Ticket Category not found');
            }
    
            await this.ticketCategoryRepository.remove(ticketCategory);
        } catch (error) {
            throw new Error(error);
        }
    }
    
}
