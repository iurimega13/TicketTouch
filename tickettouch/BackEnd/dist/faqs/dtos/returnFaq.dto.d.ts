import { FaqEntity } from "../../faqs/entities/faq.entity";
export declare class ReturnFaqDto {
    id: string;
    question: string;
    answer: string;
    constructor(faq: FaqEntity);
}
