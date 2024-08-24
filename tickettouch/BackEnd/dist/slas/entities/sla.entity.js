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
exports.SlaEntity = void 0;
const typeorm_1 = require("typeorm");
let SlaEntity = class SlaEntity {
};
exports.SlaEntity = SlaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SlaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', nullable: false }),
    __metadata("design:type", String)
], SlaEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', nullable: false }),
    __metadata("design:type", String)
], SlaEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time', nullable: false }),
    __metadata("design:type", String)
], SlaEntity.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'response_time', nullable: false }),
    __metadata("design:type", Number)
], SlaEntity.prototype, "response_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'resolution_time', nullable: false }),
    __metadata("design:type", Number)
], SlaEntity.prototype, "resolution_time", void 0);
exports.SlaEntity = SlaEntity = __decorate([
    (0, typeorm_1.Entity)('slas')
], SlaEntity);
//# sourceMappingURL=sla.entity.js.map