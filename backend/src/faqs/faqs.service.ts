import { UpdateFaqDto } from './dtos/updateFaq.dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FaqEntity } from './entities/faq.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { CreateFaqDto } from './dtos/createFaq.dto';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(FaqEntity)
    private readonly faqRepository: Repository<FaqEntity>,
  ) {}

  async createFaq(createFaqDto: CreateFaqDto): Promise<FaqEntity> {
    try {
      const faq = {
        ...createFaqDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return await this.faqRepository.save(faq);
    } catch (error) {
      throw new BadRequestException('Erro ao criar FAQ');
    }
  }

  async updateFaq(id: string, updateFaqDto: UpdateFaqDto): Promise<FaqEntity> {
    try {
      const faq = await this.getFaqById(id);
      if (!faq) {
        throw new NotFoundException('FAQ não encontrada');
      }
      const updatedFaq = {
        ...faq,
        ...updateFaqDto,
        updatedAt: new Date(),
      };
      return await this.faqRepository.save(updatedFaq);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar FAQ');
    }
  }

  async getAllFaqsWithPagination(
    page: number,
    limit: number,
    filter: string,
    sortBy: string,
    sortOrder: 'ASC' | 'DESC',
  ): Promise<{ data: FaqEntity[]; total: number }> {
    try {
      const skip = (page - 1) * limit;

      const queryBuilder = this.faqRepository.createQueryBuilder('faq');

      if (filter) {
        queryBuilder.where('faq.question LIKE :filter', {
          filter: `%${filter}%`,
        });
      }

      queryBuilder.orderBy(`faq.${sortBy}`, sortOrder).skip(skip).take(limit);

      const [faqs, total] = await queryBuilder.getManyAndCount();
      return { data: faqs, total };
    } catch (error) {
      throw new Error(`Erro ao buscar FAQs com paginação: ${error.message}`);
    }
  }

  async getAllFaqsWithoutPagination(): Promise<FaqEntity[]> {
    try {
      return await this.faqRepository.find();
    } catch (error) {
      throw new Error('Erro ao buscar todas as FAQs');
    }
  }

  async getFaqById(id: string): Promise<FaqEntity> {
    try {
      const faq = await this.faqRepository.findOne({ where: { id } });
      if (!faq) {
        throw new Error('FAQ não encontrada');
      }
      return faq;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteFaq(id: string): Promise<void> {
    try {
      const faq = await this.getFaqById(id);
      if (!faq) {
        throw new NotFoundException('FAQ não encontrada');
      }
      await this.faqRepository.delete(id); // Alterado para exclusão permanente
    } catch (error) {
      console.error('Erro ao deletar FAQ:', error);
      throw new BadRequestException('Erro ao deletar FAQ');
    }
  }
}
