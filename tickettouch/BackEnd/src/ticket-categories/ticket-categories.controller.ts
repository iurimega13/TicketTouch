import { CreateTicketCategoryDto } from './dtos/createTicketCategory.dto';
import { UpdateTicketCategoryDto } from './dtos/updateTicketCategory.dto';
import { TicketCategoryEntity } from './entities/ticketCategory.entity';
import { TicketCategoriesService } from './ticket-categories.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('ticket-categories')
export class TicketCategoriesController {

    constructor(private readonly ticketCategoriesService:TicketCategoriesService) { }

    // Método para criar uma nova categoria de ticket
    // Usa o decorador @Post() para definir que este método deve ser chamado quando uma requisição POST for feita para a rota '/ticket-categories'
    @UsePipes(ValidationPipe)
    @Post()
    async createTicketCategory(@Body() createTicketCategoryDto: CreateTicketCategoryDto): Promise<TicketCategoryEntity> {
        return this.ticketCategoriesService.createTicketCategory(createTicketCategoryDto);
    }

    // Método para atualizar uma categoria de ticket existente
    // Usa o decorador @Put(':id') para definir que este método deve ser chamado quando uma requisição PUT for feita para a rota '/ticket-categories/:id'
    @UsePipes(ValidationPipe)
    @Put(':id')
    async updateTicketCategory(@Body() updateTicketCategoryDto: UpdateTicketCategoryDto): Promise<TicketCategoryEntity> {
        return this.ticketCategoriesService.updateTicketCategory(updateTicketCategoryDto);
    }

    // Método para deletar uma categoria de ticket existente
    // Usa o decorador @Delete(':id') para definir que este método deve ser chamado quando uma requisição DELETE for feita para a rota '/ticket-categories/:id'
    @Delete(':id')
    async deleteTicketCategory(@Param('id') id: number): Promise<void> {
        return this.ticketCategoriesService.deleteTicketCategory(id);
    }

    // Método para buscar todas as categorias de ticket
    // Usa o decorador @Get() para definir que este método deve ser chamado quando uma requisição GET for feita para a rota '/ticket-categories'
    @Get()
    async getAllTicketCategories(): Promise<TicketCategoryEntity[]> {
        return await this.ticketCategoriesService.getAllTicketCategories();
    }
}
