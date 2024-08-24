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
exports.FaqsController = void 0;
const common_1 = require("@nestjs/common");
const createFaq_dto_1 = require("./dtos/createFaq.dto");
const returnFaq_dto_1 = require("./dtos/returnFaq.dto");
const faqs_service_1 = require("./faqs.service");
const updateFaq_dto_1 = require("./dtos/updateFaq.dto");
let FaqsController = class FaqsController {
    constructor(faqsService) {
        this.faqsService = faqsService;
    }
    async createFaq(createFaqDto) {
        return this.faqsService.createFaq(createFaqDto);
    }
    async updateFaq(id, updateFaqDto) {
        return this.faqsService.updateFaq(id, updateFaqDto);
    }
    async getAllFaqs() {
        return (await this.faqsService.getAllFaqs()).map((FaqEntity) => new returnFaq_dto_1.ReturnFaqDto(FaqEntity));
    }
    async deleteFaq(id) {
        await this.faqsService.deleteFaq(id);
    }
};
exports.FaqsController = FaqsController;
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)('CreateFaq'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createFaq_dto_1.CreateFaqDto]),
    __metadata("design:returntype", Promise)
], FaqsController.prototype, "createFaq", null);
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateFaq_dto_1.UpdateFaqDto]),
    __metadata("design:returntype", Promise)
], FaqsController.prototype, "updateFaq", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FaqsController.prototype, "getAllFaqs", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FaqsController.prototype, "deleteFaq", null);
exports.FaqsController = FaqsController = __decorate([
    (0, common_1.Controller)('faqs'),
    __metadata("design:paramtypes", [faqs_service_1.FaqsService])
], FaqsController);
//# sourceMappingURL=faqs.controller.js.map