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
exports.DepartamentsController = void 0;
const departaments_service_1 = require("./departaments.service");
const common_1 = require("@nestjs/common");
const returnDepartament_dto_1 = require("./dtos/returnDepartament.dto");
const updateDepartament_dto_1 = require("./dtos/updateDepartament.dto");
const createDepartament_dto_1 = require("./dtos/createDepartament.dto");
let DepartamentsController = class DepartamentsController {
    constructor(DepartamentsService) {
        this.DepartamentsService = DepartamentsService;
    }
    async createDepartament(createDepartamentDto) {
        return this.DepartamentsService.createDepartament(createDepartamentDto);
    }
    async updateDepartament(id, updateDepartamentDto) {
        return this.DepartamentsService.updateDepartament(id, updateDepartamentDto);
    }
    async deleteDepartament(id) {
        return this.DepartamentsService.deleteDepartament(id);
    }
    async getAllDepartaments() {
        return (await this.DepartamentsService.getAllDepartaments()).map((departament) => new returnDepartament_dto_1.ReturnDepartamentDto(departament));
    }
};
exports.DepartamentsController = DepartamentsController;
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createDepartament_dto_1.CreateDepartamentDto]),
    __metadata("design:returntype", Promise)
], DepartamentsController.prototype, "createDepartament", null);
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateDepartament_dto_1.UpdateDepartamentDto]),
    __metadata("design:returntype", Promise)
], DepartamentsController.prototype, "updateDepartament", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartamentsController.prototype, "deleteDepartament", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartamentsController.prototype, "getAllDepartaments", null);
exports.DepartamentsController = DepartamentsController = __decorate([
    (0, common_1.Controller)('departaments'),
    __metadata("design:paramtypes", [departaments_service_1.DepartamentsService])
], DepartamentsController);
//# sourceMappingURL=departaments.controller.js.map