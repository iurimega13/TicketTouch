import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateFaqDto } from './dtos/createFaq.dto';
import { ReturnFaqDto } from './dtos/returnFaq.dto';
import { FaqEntity } from './entities/faq.entity';
import { FaqsService } from './faqs.service';
import { UpdateFaqDto } from './dtos/updateFaq.dto';

@Controller('faqs')
export class FaqsController {

    constructor(private readonly faqsService: FaqsService) {}

    @UsePipes(ValidationPipe)
    @Post('CreateFaq')
    async createFaq(@Body() createFaqDto: CreateFaqDto): Promise<FaqEntity> {
        return this.faqsService.createFaq(createFaqDto);
    }

    @UsePipes(ValidationPipe)
    @Put(':id')
    async updateFaq(@Param('id') id: string,@Body() updateFaqDto: UpdateFaqDto): Promise<FaqEntity> {
        return this.faqsService.updateFaq(id, updateFaqDto);
    }

    @Get()
    async getAllFaqs(): Promise<ReturnFaqDto[]> {
        return (await this.faqsService.getAllFaqs()).map((FaqEntity) => new ReturnFaqDto(FaqEntity));
    }

    @Delete(':id')
    async deleteFaq(@Param('id') id: string): Promise<void> {
        await this.faqsService.deleteFaq(id);
    }
}
