"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitsModule = void 0;
const common_1 = require("@nestjs/common");
const unit_entity_1 = require("./entities/unit.entity");
const units_controller_1 = require("./units.controller");
const units_service_1 = require("./units.service");
const typeorm_1 = require("@nestjs/typeorm");
let UnitsModule = class UnitsModule {
};
exports.UnitsModule = UnitsModule;
exports.UnitsModule = UnitsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([unit_entity_1.UnitEntity])
        ],
        controllers: [units_controller_1.UnitsController],
        providers: [units_service_1.UnitsService],
        exports: [units_service_1.UnitsService]
    })
], UnitsModule);
//# sourceMappingURL=units.module.js.map