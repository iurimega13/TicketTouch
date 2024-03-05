import { UpdateFaqDto } from './dtos/updateFaq.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FaqEntity } from './entities/faq.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
            };
            return await this.faqRepository.save(faq);
            }
        catch (error) {
            throw new Error(error);
        }
    }


    async updateFaq(id: string, updateFaqDto: UpdateFaqDto): Promise<FaqEntity> {
        try {
            const faq = await this.getFaqById(id);
            if (!faq) {
                throw new Error('FAQ not found');
            }
            const updatedFaq = {
                ...faq,
                ...updateFaqDto,
            };
            return await this.faqRepository.save(updatedFaq);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllFaqs(): Promise<FaqEntity[]> {
        try {
            return await this.faqRepository.find();
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }


    async getFaqById(id: string): Promise<FaqEntity> {
        try {
            return await this.faqRepository.findOneOrFail({ where: { id } });
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }


    async deleteFaq(id: string): Promise<void> {
        await this.getFaqById(id);
        await this.faqRepository.softDelete(id);

    }
}
