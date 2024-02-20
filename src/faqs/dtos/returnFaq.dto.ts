import { FaqEntity } from "src/faqs/entities/faq.entity";

export class ReturnFaqDto {
    id: number;
    question: string;
    answer: string;

    constructor(faq: FaqEntity) {
        this.id = faq.id;
        this.question = faq.question;
        this.answer = faq.answer;
    }
}