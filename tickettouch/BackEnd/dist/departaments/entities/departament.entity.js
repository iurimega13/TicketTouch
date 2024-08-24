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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartamentEntity = void 0;
const unit_entity_1 = require("../../units/entities/unit.entity");
const typeorm_1 = require("typeorm");
let DepartamentEntity = class DepartamentEntity {
};
exports.DepartamentEntity = DepartamentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DepartamentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', nullable: false }),
    __metadata("design:type", String)
], DepartamentEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.UnitEntity),
    (0, typeorm_1.JoinColumn)({ name: 'unit_id' }),
    __metadata("design:type", unit_entity_1.UnitEntity)
], DepartamentEntity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', nullable: false }),
    __metadata("design:type", Date)
], DepartamentEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', nullable: false }),
    __metadata("design:type", Date)
], DepartamentEntity.prototype, "updated_at", void 0);
exports.DepartamentEntity = DepartamentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'departaments' })
], DepartamentEntity);
//# sourceMappingURL=departament.entity.js.map