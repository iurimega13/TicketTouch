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
exports.UnitsController = void 0;
const common_1 = require("@nestjs/common");
const createUnit_dto_1 = require("./dtos/createUnit.dto");
const returnUnit_dto_1 = require("./dtos/returnUnit.dto");
const updateUnit_dto_1 = require("./dtos/updateUnit.dto");
const units_service_1 = require("./units.service");
let UnitsController = class UnitsController {
    constructor(unitsService) {
        this.unitsService = unitsService;
    }
    async createUnit(createUnitDto) {
        return this.unitsService.createUnit(createUnitDto);
    }
    async updateUnit(updateUnitDto) {
        return this.unitsService.updateUnit(updateUnitDto);
    }
    async deleteUnit(id) {
        return this.unitsService.deleteUnit(id);
    }
    async getAllUnits() {
        return (await this.unitsService.getAllUnits()).map((unit) => new returnUnit_dto_1.ReturnUnitDto(unit));
    }
};
exports.UnitsController = UnitsController;
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUnit_dto_1.CreateUnitDto]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "createUnit", null);
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUnit_dto_1.UpdateUnitDto]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "updateUnit", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "deleteUnit", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "getAllUnits", null);
exports.UnitsController = UnitsController = __decorate([
    (0, common_1.Controller)('units'),
    __metadata("design:paramtypes", [units_service_1.UnitsService])
], UnitsController);
//# sourceMappingURL=units.controller.js.map