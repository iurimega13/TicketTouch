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
exports.EquipmentsController = void 0;
const common_1 = require("@nestjs/common");
const createEquipment_dto_1 = require("./dtos/createEquipment.dto");
const returnEquipment_dto_1 = require("./dtos/returnEquipment.dto");
const updateEquipment_dto_1 = require("./dtos/updateEquipment.dto");
const equipments_service_1 = require("./equipments.service");
let EquipmentsController = class EquipmentsController {
    constructor(equipmentsService) {
        this.equipmentsService = equipmentsService;
    }
    async create(createEquipmentDto) {
        return await this.equipmentsService.createEquipment(createEquipmentDto);
    }
    async update(updateEquipmentDto) {
        return await this.equipmentsService.updateEquipment(updateEquipmentDto);
    }
    async delete(id) {
        return await this.equipmentsService.deleteEquipment(id);
    }
    async getAll() {
        return (await this.equipmentsService.getAllEquipments()).map((equipment) => new returnEquipment_dto_1.ReturnEquipmentDto(equipment));
    }
};
exports.EquipmentsController = EquipmentsController;
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createEquipment_dto_1.CreateEquipmentDto]),
    __metadata("design:returntype", Promise)
], EquipmentsController.prototype, "create", null);
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateEquipment_dto_1.UpdateEquipmentDto]),
    __metadata("design:returntype", Promise)
], EquipmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EquipmentsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EquipmentsController.prototype, "getAll", null);
exports.EquipmentsController = EquipmentsController = __decorate([
    (0, common_1.Controller)('equipaments'),
    __metadata("design:paramtypes", [equipments_service_1.EquipmentsService])
], EquipmentsController);
//# sourceMappingURL=equipments.controller.js.map