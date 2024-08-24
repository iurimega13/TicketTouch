import { CreateFaqDto } from './dtos/createFaq.dto';
import { ReturnFaqDto } from './dtos/returnFaq.dto';
import { FaqEntity } from './entities/faq.entity';
import { FaqsService } from './faqs.service';
import { UpdateFaqDto } from './dtos/updateFaq.dto';
export declare class FaqsController {
    private readonly faqsService;
    constructor(faqsService: FaqsService);
    createFaq(createFaqDto: CreateFaqDto): Promise<FaqEntity>;
    updateFaq(id: string, updateFaqDto: UpdateFaqDto): Promise<FaqEntity>;
    getAllFaqs(): Promise<ReturnFaqDto[]>;
    deleteFaq(id: string): Promise<void>;
}
