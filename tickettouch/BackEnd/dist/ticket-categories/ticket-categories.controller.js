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
exports.TicketCategoriesController = void 0;
const createTicketCategory_dto_1 = require("./dtos/createTicketCategory.dto");
const updateTicketCategory_dto_1 = require("./dtos/updateTicketCategory.dto");
const ticket_categories_service_1 = require("./ticket-categories.service");
const common_1 = require("@nestjs/common");
let TicketCategoriesController = class TicketCategoriesController {
    constructor(ticketCategoriesService) {
        this.ticketCategoriesService = ticketCategoriesService;
    }
    async createTicketCategory(createTicketCategoryDto) {
        return this.ticketCategoriesService.createTicketCategory(createTicketCategoryDto);
    }
    async updateTicketCategory(updateTicketCategoryDto) {
        return this.ticketCategoriesService.updateTicketCategory(updateTicketCategoryDto);
    }
    async deleteTicketCategory(id) {
        return this.ticketCategoriesService.deleteTicketCategory(id);
    }
    async getAllTicketCategories() {
        return await this.ticketCategoriesService.getAllTicketCategories();
    }
};
exports.TicketCategoriesController = TicketCategoriesController;
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTicketCategory_dto_1.CreateTicketCategoryDto]),
    __metadata("design:returntype", Promise)
], TicketCategoriesController.prototype, "createTicketCategory", null);
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateTicketCategory_dto_1.UpdateTicketCategoryDto]),
    __metadata("design:returntype", Promise)
], TicketCategoriesController.prototype, "updateTicketCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketCategoriesController.prototype, "deleteTicketCategory", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketCategoriesController.prototype, "getAllTicketCategories", null);
exports.TicketCategoriesController = TicketCategoriesController = __decorate([
    (0, common_1.Controller)('ticket-categories'),
    __metadata("design:paramtypes", [ticket_categories_service_1.TicketCategoriesService])
], TicketCategoriesController);
//# sourceMappingURL=ticket-categories.controller.js.map