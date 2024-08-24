import { FaqEntity } from "../entities/faq.entity";

export class ReturnFaqDto {
    id: string;
    question: string;
    answer: string;

    constructor(faq: FaqEntity) {
        this.id = faq.id;
        this.question = faq.question;
        this.answer = faq.answer;
    }
}