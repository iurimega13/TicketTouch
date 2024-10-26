import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
  @Put(':id')
  async updateFaq(
    @Param('id') id: string,
    @Body() updateFaqDto: UpdateFaqDto,
  ): Promise<FaqEntity> {
    return this.faqsService.updateFaq(id, updateFaqDto);
  }

  @Get('all')
  async getAllFaqsWithoutPagination(): Promise<ReturnFaqDto[]> {
    const faqs = await this.faqsService.getAllFaqsWithoutPagination();
    return faqs.map((faq) => new ReturnFaqDto(faq));
  }

  @Get()
  async getAllFaqsWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Query('filter') filter: string = '',
    @Query('sortBy') sortBy: string = 'question',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<{ data: ReturnFaqDto[]; total: number }> {
    const { data, total } = await this.faqsService.getAllFaqsWithPagination(
      page,
      limit,
      filter,
      sortBy,
      sortOrder,
    );
    const result = data.map((faq) => new ReturnFaqDto(faq));
    return { data: result, total };
  }

  @Get(':id')
  async getFaqById(@Param('id') id: string): Promise<FaqEntity> {
    try {
      const faq = await this.faqsService.getFaqById(id);
      return faq;
    } catch (error) {
      throw new NotFoundException('FAQ não encontrada');
    }
  }

  @Delete(':id')
  async deleteFaq(@Param('id') id: string): Promise<void> {
    try {
      await this.faqsService.deleteFaq(id);
    } catch (error) {
      console.error('Erro ao deletar FAQ:', error);
      throw new BadRequestException('Erro ao deletar FAQ');
    }
  }
}
