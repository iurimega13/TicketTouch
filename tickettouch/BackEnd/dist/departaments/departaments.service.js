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
exports.DepartamentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const departament_entity_1 = require("./entities/departament.entity");
let DepartamentsService = class DepartamentsService {
    constructor(departamentRepository) {
        this.departamentRepository = departamentRepository;
    }
    async createDepartament(createDepartamentDto) {
        try {
            const departament = {
                ...createDepartamentDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            return await this.departamentRepository.save(departament);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateDepartament(id, updateDepartamentDto) {
        try {
            const departament = await this.getDepartamentById(id);
            if (!departament) {
                throw new Error('Departament not found');
            }
            const updatedDepartament = {
                ...departament,
                ...updateDepartamentDto,
                updatedAt: new Date(),
            };
            return await this.departamentRepository.save(updatedDepartament);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAllDepartaments() {
        try {
            return await this.departamentRepository.find();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getDepartamentById(id) {
        try {
            return await this.departamentRepository.findOne({ where: { id } });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteDepartament(id) {
        try {
            await this.departamentRepository.delete(id);
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.DepartamentsService = DepartamentsService;
exports.DepartamentsService = DepartamentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(departament_entity_1.DepartamentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepartamentsService);
//# sourceMappingURL=departaments.service.js.map