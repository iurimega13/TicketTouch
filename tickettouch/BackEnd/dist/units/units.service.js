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
exports.UnitsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const unit_entity_1 = require("./entities/unit.entity");
let UnitsService = class UnitsService {
    constructor(unitRepository) {
        this.unitRepository = unitRepository;
    }
    async createUnit(createUnitDto) {
        try {
            const unit = {
                ...createUnitDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            return await this.unitRepository.save(unit);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateUnit(updateUnitDto) {
        try {
            const unit = await this.getUnitById(updateUnitDto.id);
            if (!unit) {
                throw new Error('Unit not found');
            }
            const updatedUnit = {
                ...unit,
                ...updateUnitDto,
                updatedAt: new Date(),
            };
            return await this.unitRepository.save(updatedUnit);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAllUnits() {
        try {
            return await this.unitRepository.find();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getUnitById(id) {
        try {
            const unit = await this.unitRepository.findOne({ where: { id } });
            if (!unit) {
                throw new Error('Unit not found');
            }
            return unit;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteUnit(id) {
        try {
            const unit = await this.getUnitById(id);
            if (!unit) {
                throw new Error('Unit not found');
            }
            await this.unitRepository.delete(id);
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.UnitsService = UnitsService;
exports.UnitsService = UnitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(unit_entity_1.UnitEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UnitsService);
//# sourceMappingURL=units.service.js.map