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
exports.EquipmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const equipment_entity_1 = require("./entities/equipment.entity");
let EquipmentsService = class EquipmentsService {
    constructor(equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }
    async createEquipment(createEquipmentDto) {
        try {
            const equipment = {
                ...createEquipmentDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            return await this.equipmentRepository.save(equipment);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateEquipment(updateEquipmentDto) {
        try {
            const equipment = await this.getEquipmentById(updateEquipmentDto.id);
            if (!equipment) {
                throw new Error('Equipment not found');
            }
            const updatedEquipment = {
                ...equipment,
                ...updateEquipmentDto,
                updatedAt: new Date(),
            };
            return await this.equipmentRepository.save(updatedEquipment);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteEquipment(id) {
        try {
            const equipment = await this.getEquipmentById(id);
            if (!equipment) {
                throw new Error('Equipment not found');
            }
            await this.equipmentRepository.delete(id);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAllEquipments() {
        try {
            return await this.equipmentRepository.find();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getEquipmentById(id) {
        try {
            return await this.equipmentRepository.findOne({ where: { id } });
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.EquipmentsService = EquipmentsService;
exports.EquipmentsService = EquipmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(equipment_entity_1.EquipmentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EquipmentsService);
//# sourceMappingURL=equipments.service.js.map