import { UpdateFaqDto } from './dtos/updateFaq.dto';
import { FaqEntity } from './entities/faq.entity';
import { Repository } from 'typeorm';
import { CreateFaqDto } from './dtos/createFaq.dto';
export declare class FaqsService {
    private readonly faqRepository;
    constructor(faqRepository: Repository<FaqEntity>);
    createFaq(createFaqDto: CreateFaqDto): Promise<FaqEntity>;
    updateFaq(id: string, updateFaqDto: UpdateFaqDto): Promise<FaqEntity>;
    getAllFaqs(): Promise<FaqEntity[]>;
    getFaqById(id: string): Promise<FaqEntity>;
    deleteFaq(id: string): Promise<void>;
}
