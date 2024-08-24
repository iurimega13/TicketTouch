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
exports.TicketCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ticketCategory_entity_1 = require("./entities/ticketCategory.entity");
let TicketCategoriesService = class TicketCategoriesService {
    constructor(ticketCategoryRepository) {
        this.ticketCategoryRepository = ticketCategoryRepository;
    }
    async createTicketCategory(createTicketCategoryDto) {
        try {
            const ticketCategory = {
                ...createTicketCategoryDto,
            };
            return await this.ticketCategoryRepository.save(ticketCategory);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateTicketCategory(updateTicketCategoryDto) {
        try {
            const ticketCategory = await this.getTicketCategoryById(updateTicketCategoryDto.id);
            if (!ticketCategory) {
                throw new Error('Ticket Category not found');
            }
            const updatedTicketCategory = {
                ...ticketCategory,
                ...updateTicketCategoryDto,
            };
            return await this.ticketCategoryRepository.save(updatedTicketCategory);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAllTicketCategories() {
        try {
            return await this.ticketCategoryRepository.find();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getTicketCategoryById(id) {
        try {
            return await this.ticketCategoryRepository.findOne({ where: { id } });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteTicketCategory(id) {
        try {
            const ticketCategory = await this.getTicketCategoryById(id);
            if (!ticketCategory) {
                throw new Error('Ticket Category not found');
            }
            await this.ticketCategoryRepository.remove(ticketCategory);
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.TicketCategoriesService = TicketCategoriesService;
exports.TicketCategoriesService = TicketCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticketCategory_entity_1.TicketCategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TicketCategoriesService);
//# sourceMappingURL=ticket-categories.service.js.map