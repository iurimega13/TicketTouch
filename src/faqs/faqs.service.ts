import { UpdateFaqDto } from './dtos/updateFaq.dto';
import { Injectable } from '@nestjs/common';
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
            const now = new Date();

            const faq = {
                ...createFaqDto,
                createdAt: now,
                updatedAt: now,
            };
            return await this.faqRepository.save(faq);
            }
        catch (error) {
            throw new Error(error);
        }
    }


    async updateFaq( updateFaqDto: UpdateFaqDto): Promise<FaqEntity> {
        try {
            const faq = await this.getFaqById(updateFaqDto.id);
            if (!faq) {
                throw new Error('FAQ not found');
            }

            const updatedFaq = {
                ...faq,
                ...updateFaqDto,
                updatedAt: new Date(),
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
            throw new Error(error);
        }
    }


    async getFaqById(id: number): Promise<FaqEntity> {
        try {
            const faq = await this.faqRepository.findOne({ where: { id }});
            if (!faq) {
                throw new Error('FAQ not found');
            }
            return faq;
        } catch (error) {
            throw new Error(error);
        }
    }
}
