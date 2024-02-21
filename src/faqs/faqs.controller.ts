import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateFaqDto } from './dtos/createFaq.dto';
import { ReturnFaqDto } from './dtos/returnFaq.dto';
import { FaqEntity } from './entities/faq.entity';
import { FaqsService } from './faqs.service';
import { UpdateFaqDto } from './dtos/updateFaq.dto';

@Controller('faqs')
export class FaqsController {

    constructor(private readonly faqsService: FaqsService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async createFaq(@Body() createFaqDto: CreateFaqDto): Promise<FaqEntity> {
        return this.faqsService.createFaq(createFaqDto);
    }

    @UsePipes(ValidationPipe)
    @Post()
    async updateFaq(@Body() updateFaqDto: UpdateFaqDto): Promise<FaqEntity> {
        return this.faqsService.updateFaq(updateFaqDto);
    }

    @Get()
    async getAllFaqs(): Promise<ReturnFaqDto[]> {
        return (await this.faqsService.getAllFaqs()).map((FaqEntity) => new ReturnFaqDto(FaqEntity));
    }
}
