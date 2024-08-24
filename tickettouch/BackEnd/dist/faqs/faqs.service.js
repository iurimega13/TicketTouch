"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqsService = void 0;
const common_1 = require("@nestjs/common");
const faq_entity_1 = require("./entities/faq.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let FaqsService = class FaqsService {
    constructor(faqRepository) {
        this.faqRepository = faqRepository;
    }
    async createFaq(createFaqDto) {
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
    async updateFaq(id, updateFaqDto) {
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
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAllFaqs() {
        try {
            return await this.faqRepository.find();
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async getFaqById(id) {
        try {
            return await this.faqRepository.findOneOrFail({ where: { id } });
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async deleteFaq(id) {
        await this.getFaqById(id);
        await this.faqRepository.softDelete(id);
    }
};
exports.FaqsService = FaqsService;
exports.FaqsService = FaqsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(faq_entity_1.FaqEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FaqsService);
//# sourceMappingURL=faqs.service.js.map